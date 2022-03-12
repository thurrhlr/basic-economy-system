const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

    let timeout = 6000000;

    let user = message.author;
    let guild = message.guild;

    function ms(ms) {
        const seconds = ~~(ms / 1000)
        const minutes = ~~(seconds / 60)
        const hours = ~~(minutes / 60)
        const days = ~~(hours / 24)

        return { days, hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60 }

    }

    let errorarg = new MessageEmbed()
    .setTitle("Algo deu errado...")
    .setURL("https://google.com/%22")
    .setDescription("\`\`\`Informe o usuário que deseja roubar!\`\`\`")

    if (!args[0]) return message.reply({ embeds: [errorarg] })

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0].replace(/[<>@!]/g, ""));

    if (!member) return message.reply({ embeds: [errorarg] })

    let moedas = db.get(`moedas_${guild.id}_${member.id}`)

    let author = await db.get(`rob_${guild.id}_${user.id}`)

    if (author !== null && timeout - (Date.now() - author) > 0) {

        let time = ms(timeout - (Date.now() - author));

        let error = new MessageEmbed()
        .setTitle("Eita... Parece que você já roubou demais por hoje!")
        .setURL("https://google.com/%22")
        .setDescription(`Aguarde o tempo de \`${time.minutes} minutos e ${time.seconds} segundos\` para roubar novamente!`)

        message.reply({ embeds: [error] })

    } else {

        let amount = Math.floor(Math.random() * 1000) + 10;

        let errorrob = new MessageEmbed()
        .setTitle("Algo deu errado!")
        .setURL("https://google.com/%22")
        .setDescription(`O usuário não possui moedas o suficiente para serem roubadas`)

        if (moedas < amount) return message.reply({ embeds: [errorrob] })

        let sucess = new MessageEmbed()
            .setTitle(`<:sucesso:947630673198481428> Você efetuou um roubo!`)
            .setColor("GREEN")
            .setDescription(`Foram roubadas \`\`${amount}\`\` moedas de \`\`${member}\`\``)

        db.subtract(`moedas_${guild.id}_${member.id}`, amount)
        db.add(`moedas_${guild.id}_${user.id}`, amount)
        db.set(`rob_${guild.id}_${user.id}`, Date.now())

        message.reply({ embeds: [sucess] })
    }

}

module.exports.help = {
    name: "roubar",
    aliases: ["steal"]
}