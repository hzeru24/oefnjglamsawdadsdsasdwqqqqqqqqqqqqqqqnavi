const client = require('../../index')
const { MessageEmbed } = require('discord.js');
const gp = require("../../schemas/ghostping")
const { blank } = require("../../botconfig/main.json")

client.on('messageDelete', async (message) => {

    if(!message.guild || message.author.bot) return;
    const member = message.mentions.members.first()
    if (member) {
        if (member.id == message.author.id) return;
      let data;
    try {
      data = await gp.findOne({
            userId: message.mentions.members.first().id,
            guildId: message.guild.id
        })
    } catch (e) {
      console.error(e)
    }

      if(data) {
        member.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor({name: `${message.author.tag} has ghost pinged you!`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
                    .setDescription(message.content)
                    .setColor(`${blank}`)
                    .setFooter({text: `${message.guild.name}`, iconURL: `${message.guild.iconURL({dynamic: true})}`})
                    .setTimestamp()
            ]})
      }
    } // if(member)

/*  if(message.content.toLowerCase().startsWith(`${conf.prefix}ghostping false`)) {
    let deletedData;
    try {
      deletedData = await gp.deleteOne({
        userId: message.author.id,
        guildId: message.guild.id
      })
    } catch (e) {
      console.error(e)
    }
  

  }

*/

  
})