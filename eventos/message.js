module.exports = async (bot, message) => {
    const Discord = require("discord.js");
    const prefix = process.env.PREFIXO;
  
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.startsWith(`<@${bot.user.id}>` || message.content.startsWith(`<@!${bot.user.id}>`))) {
      
    return;
    };
    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    const comandoFile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (comandoFile) comandoFile.run(bot, message, args);
  
    
};
