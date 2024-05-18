const { MessageEmbed } = require("discord.js");
const ownerid = ["845823982238564362"];
const ownerid2 = ["795217521136893983"];

module.exports = {
    name: "botavatar",
    aliases: ["botprofile"],
    category: "owner",
    developersOnly: true,
  run: async (client, message, args) => {
    if (message.author.id == ownerid || ownerid2) {
      if(!args[0]) return message.channel.send('Please enter an image link for the bot!').then(msg => {
    setTimeout(() => {
  msg.delete()
}, 3000)    
  })
      client.user.setAvatar(args[0]).catch((err) => {
        message.channel.send("Error: " + err.message).then(msg => {
    setTimeout(() => {
  msg.delete()
}, 10000)    
  })
      })
      message.channel.send(`The bot's avatar has been changed!`).then(msg => {
    setTimeout(() => {
  msg.delete()
}, 5000)    
  })
      
    }
  }
}