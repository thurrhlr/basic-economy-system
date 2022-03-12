const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

    let membro = message.mentions.members.first() || message.member;
  
    let guild = message.guild;

    let moedas = db.get(`moedas_${guild.id}_${membro.id}`)
    if (moedas === null) moedas = 0;

    let banco = db.get(`banco_${guild.id}_${membro.id}`)
    if (banco === null) banco = 0;

    let moneyEmbed = new MessageEmbed()
    .setTitle(`Saldo de (${membro.displayName})`)
    .setURL("https://google.com/%22")
    .setDescription(`🪙 → Moedas na Carteira: ${moedas}\n🏦 → Moedas no Banco: ${banco}`)

    message.reply({embeds: [moneyEmbed]})  

}

module.exports.help = {
    name: "bal",
    aliases: [""]
}