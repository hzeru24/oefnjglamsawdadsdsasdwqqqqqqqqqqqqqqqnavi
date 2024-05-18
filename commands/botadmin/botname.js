const { MessageEmbed } = require("discord.js");
const ownerid = ["845823982238564362"];
const ownerid2 = ["795217521136893983"];

module.exports = {
    name: "botname",
    aliases: ["botusername"],
    category: "owner",
    developersOnly: true,
  run: async (client, message, args) => {

    if (message.author.id == ownerid || ownerid2) {
    
    const ar = args.join(" ")
      if(!ar) return message.channel.send('Please enter a new name for the bot!').then(msg => {
    setTimeout(() => {
  msg.delete()
}, 3000)    
  })
      client.user.setUsername(ar).catch((err) => {
        message.channel.send("Error: " + err.message).then(msg => {
    setTimeout(() => {
  msg.delete()
}, 10000)    
  })
      })
      message.channel.send(`The bot's name will now be ${args[0]}.`).then(msg => {
    setTimeout(() => {
  msg.delete()
}, 5000)    
  })
      
    }
  }
}