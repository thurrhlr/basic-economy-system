const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ms = require("pretty-ms");

module.exports.run = async (bot, message, args) => {

    let timeout = 6000000;

    let user = message.author;
    let guild = message.guild;

    function ms(ms) {
        const seconds = ~~(ms/1000)
        const minutes = ~~(seconds/60)
        const hours = ~~(minutes/60) 
        const days = ~~(hours/24)
        
        return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
    
    }

    let author = await db.get(`work_${guild.id}_${user.id}`)  

    if (author !== null && timeout - (Date.now() - author) > 0) {
          
        let time = ms(timeout - (Date.now() - author));

        let error = new MessageEmbed()
        .setTitle(`Parece que você já trabalhou muito por hoje...`)
        .setURL("https://google.com/%22")
        .setDescription(`Agora aguarde \`${time.minutes} minutos e ${time.seconds} segundos\``)
      
         message.reply({embeds: [error]})

    } else {     

        let amount = Math.floor(Math.random() * 1000) + 1;

        let sucess = new MessageEmbed()
        .setTitle(`Hora de trabalhar!`)
        .setURL("https://google.com/%22")
        .setDescription(`Você trabalhou e conseguiu **${amount}** moedas!`)

        message.reply({embeds: [sucess]})

        db.add(`moedas_${guild.id}_${user.id}`, amount)
        db.set(`work_${guild.id}_${user.id}`, Date.now())

    }

}

module.exports.help = {
    name: "work",
    aliases: [""]
}