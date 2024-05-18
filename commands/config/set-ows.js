const Discord = require('discord.js')

let { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const countingSchema = require("../../schemas/ows") 
module.exports = {
    name: 'setonewordstory',
    category: "category",
    description: 'description',
    usage: 'usage',
    aliases: ["setows"],
    timeout: 0,
    boostersOnly: false,
    permissions: ['ADMINISTRATOR'],
    run : async (client, message, args) => {
     
    let channel = message.mentions.channels.first() || message.channel;

    let counting = await countingSchema.findOneAndUpdate(
    {
      guild: message.guild.id
    }, {
      channel: channel.id
    }
    )

    if(!channel) {
       message.channel.send(`Please enter a channel!`)}

    if(counting) {
       message.channel.send(`Updated one word story channel to ${channel}`)
    } else {

      await countingSchema.create({
        lastUser: client.user.id,
        channel: channel.id,
        guild: message.guild.id
      })

      message.channel.send(`One word story channel set to ${channel}`)
    }

}
}