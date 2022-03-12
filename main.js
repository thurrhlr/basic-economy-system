const { Collection, Client, Intents } = require("discord.js");
const { readdir } = require("fs");
const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment-timezone');

const prefix = "!"

const bot = new Client({
  presence: {
    status: 'online',
    afk: false,
  },
  ws: {
    properties: {
      $browser: "Discord iOS"
    }
  },
  intents: [
    'GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES',
    'DIRECT_MESSAGES',
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
  ], partials: ['CHANNEL', 'MESSAGE', 'REACTION']
});
const fs = require("fs");
const { join } = require("path");
const { mainModule } = require("process");
const { channel } = require("diagnostics_channel");
const { getSystemErrorMap } = require("util");
require("dotenv").config();
bot.commands = new Collection();
bot.aliases = new Collection();

readdir(join(__dirname, "./eventos"), (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(join(__dirname, `./eventos/${file}`));
    console.log(`[EVENTO] O Evento '${file.replace(/.js/g, "")}' foi importado com sucesso!`);
    const eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

readdir(join(__dirname, "./economy"), (err, files) => {
  if (err) return console.error(err);
  const jsFile = files.filter(f => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    return console.log("Não encontrei nenhum comando!");
  }
  jsFile.forEach(f => {
    const pull = require(join(__dirname, `./economy/${f}`));
    console.log(`[ECONOMY] O Comando '${f.replace(/.js/g, "")}' foi importado com sucesso!`);
    bot.commands.set(pull.help.name, pull);
    pull.help.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.help.name);
    });
  });
});

bot.login(process.env.TOKEN)
