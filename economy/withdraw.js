const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

    let user = message.author;
    let guild = message.guild;

    let banco = db.get(`banco_${guild.id}_${user.id}`)
    if (banco === null) banco = 0;

    let errorarg = new MessageEmbed()
    .setTitle("Está faltando algo...")
    .setURL("https://google.com/%22")
    .setDescription("\`\`\`Informe o valor que deseja sacar!\`\`\`")

    if (!args[0]) return message.reply({embeds: [errorarg]})

    if (isNaN(args[0])) return message.reply({embeds: [errorarg]})

    let errorcoins = new MessageEmbed()
    .setTitle("Algo deu errado...")
    .setURL("https://google.com/%22")
    .setColor("DARK_BUT_NOT_BLACK")
    .setDescription("Você não possui moedas o suficiente no banco para sacar!")

    if (banco < args[0]) return message.reply({embeds: [errorcoins]})

    let sucess = new MessageEmbed()
    .setTitle(`<:sucesso:947630673198481428> Saque efetuado com sucesso!`)
    .setColor("GREEN")
    .setDescription(`Foram sacadas \`\`${args[0]}\`\`$ da sua conta bancaria!`)

    db.add(`moedas_${guild.id}_${user.id}`, args[0])
    db.subtract(`banco_${guild.id}_${user.id}`, args[0])

    message.reply({embeds: [sucess]})  

}

module.exports.help = {
    name: "withdraw",
    aliases: [""]
}