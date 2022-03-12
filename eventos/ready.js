module.exports = (ChristoferClient, ready) => {
    const arrayOfStatus = [
        `my developers' keyboards`,
        `my developers' keyboards`
    ]

    console.log(`O BOT ${ChristoferClient.user.username} ficou online com sucesso!`);
    setInterval(() => {
        ChristoferClient.user.setPresence({ 
            activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)], type: "LISTENING" }] })
    }, 5000)
  
  
};
