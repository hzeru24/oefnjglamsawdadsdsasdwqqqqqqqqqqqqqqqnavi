const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pinmsg",
    category: "owner",
    developersOnly: true,
  run: async (client, message, args) => {
const channelID = message.channel.id
const messageID = args[0];
    if(!messageID || isNaN(messageID)) {
      return message.channel.send('Unable to find a message to pin with that ID!').then(msg => {
    setTimeout(() => {
  msg.delete()
}, 5000)    
  })
    }
await client.channels.cache.get(channelID).messages.pin(messageID);
    message.react("✅")
  }
}