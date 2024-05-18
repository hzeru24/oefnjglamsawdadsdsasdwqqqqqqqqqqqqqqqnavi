let { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const ows = require("../../schemas/ows") 
module.exports = {
    name: 'delows',
    category: "category",
    description: 'description',
    usage: 'usage',
    aliases: ["deleteonewordstory"],
    timeout: 0,
    boostersOnly: false,
    permissions: ['ADMINISTRATOR'],
    developersOnly: true,
    run : async (client, message, args) => {
      ows.findOne({ 
        guild: message.guild.id }, async(err, data) => {
    if(err) throw err;
    if(!data) return message.react("❌")

    ows.deleteOne({ 
        guild: message.guild.id }, (err) => {
      message.react("✅")
    })
      })
    }
}