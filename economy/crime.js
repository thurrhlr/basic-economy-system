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

    let author = await db.get(`crime_${guild.id}_${user.id}`)
    if (author !== null && timeout - (Date.now() - author) > 0) {

        let time = ms(timeout - (Date.now() - author));

        const error = new MessageEmbed()
        .setTitle("Ops! Parece que você já efeutou crimes demais por hoje!")
        .setURL("https://google.com/%22")
        .setDescription(`Aguarde \`${time.minutes} minutos e ${time.seconds} segundos\` para roubar novamente`)

        message.reply({ embeds: [error] })

    } else {

        let amount = Math.floor(Math.random() * 2500) + 1;

        const sucess = new MessageEmbed()
            .setTitle(`<:advertencia:944980648517582878> Você efeutou um crime!`)
            .setColor("RED")
            .setDescription(`YAY! Você conseguiu roubar ${amount}$ `)

        message.reply({ embeds: [sucess] })

        db.add(`moedas_${guild.id}_${user.id}`, amount)
        db.set(`crime_${guild.id}_${user.id}`, Date.now())
    }

}

module.exports.help = {
    name: "crime",
    aliases: [""]
}