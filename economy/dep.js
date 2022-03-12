const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

    let user = message.author;
    let guild = message.guild;

    let moedas = db.get(`moedas_${guild.id}_${user.id}`)
    if (moedas === null) moedas = 0;

    let errorarg = new MessageEmbed()
            .setTitle("Está faltando algo...")
            .setURL("https://google.com/%22")
            .setFooter("&dep <valor>")
            .setDescription("**Revise os argumentos!**\n\`\`\`\"Value\" é um argumento necessário para a execução deste comando, revise os argumentos e tente novamente.\`\`\`")

    if (!args[0]) return message.reply({embeds: [errorarg]})

    if (isNaN(args[0])) return message.reply({embeds: [errorarg]})

    let errorcoins = new MessageEmbed()
    .setTitle("Está faltando algo...")
    .setURL("https://google.com/%22")
    .setFooter("&dep <valor>")
    .setDescription("\`\`\`Você não possui moedas o suficiente para depositar...\`\`\`")

    if (moedas < args[0]) return message.reply({embeds: [errorcoins]})

    let sucess = new MessageEmbed()
    .setTitle(`<:sucesso:947630673198481428> | Depósito efetuado com sucesso!`)
    .setColor("GREEN")
    .setDescription(`💸 Você efetuou o deposito de **${args[0]}**$ com sucesso!`)

    db.add(`banco_${guild.id}_${user.id}`, args[0])
    db.subtract(`moedas_${guild.id}_${user.id}`, args[0])

    message.reply({embeds: [sucess]})

}

module.exports.help = {
    name: "dep",
    aliases: [""]
}
