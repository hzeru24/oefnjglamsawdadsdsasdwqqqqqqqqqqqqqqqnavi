const Discord = require('discord.js')
const { prefix } = require('../../botconfig/main')
let { MessageEmbed } = require("discord.js")
const schema = require('../../schemas/ghostping')
const { blank } = require('../../botconfig/main')

module.exports = {
    name: 'ghostping',
    category: "utility",
    description: 'set ghost ping',
    usage: '?ghostping',
    aliases: [],
    timeout: 0,
    permissions: ["SEND_MESSAGES"],
    run : async (client, message, args) => {
      member = message.author;

      const embedhelp = new MessageEmbed()
      .setAuthor({name: `${client.user.username}` + " 's Help Menu", iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
      .setDescription(`\`\`\`xml\n<Usage : ${prefix}ghostping <true/false> >\`\`\`Set a ghost ping detector`)
      .addField("__Subcommands:__", "`true      :` Enable ghost ping detector\n`false     :` Disable ghost ping detector")
      .setColor(`${blank}`)
      .setTimestamp()
      if(!args[0]) return message.channel.send({embeds: [embedhelp]})
     // return message.channel.send({embeds: [embedhelp]})
      if(args[0] === 'true') {
    let data;
    try {
      data = await schema.findOne({
        userId: member.id,
        guildId: message.guild.id,
      })
      if(data) return message.channel.send('Ghost ping detector has already been enabled!')
      if(!data) {
            data = await schema.create({
                userId: member.id,
                guildId: message.guild.id,
                time: Date.now()
            })
      }
    } catch (e) {
      console.error(e)
    }

    data.Ping = true

    await data.save();

    let embed = new MessageEmbed()
    .setTitle(`Ghost ping detector has been enabled!`)
    .setDescription(`You will now receive a DM when someone ghost pings you`)
    .setColor(`${blank}`)
    message.reply({embeds: [embed], allowedMentions: { "users" : [], "roles": [], repliedUser: false }})
      } else if(args[0] === 'false') {
        schema.findOne({ userId: message.author.id , guildId: message.guild.id }, async(err, data) => {
    if(err) throw err;
    if(!data) return message.channel.send("Ghost ping detector hasn't been enabled");

    schema.deleteOne({ userId: message.author.id , guildId: message.guild.id }, (err) => {

      let embed = new MessageEmbed()
    .setTitle(`Ghost ping detector has been disabled!`)
    .setDescription(`You will no longer receive any DM when someone ghost pings you`)
    .setColor(`${blank}`)
      
      message.reply({embeds: [embed], allowedMentions: { "users" : [], "roles": [], repliedUser: false }})
  });
});
      } else {
        message.channel.send({embeds: [embedhelp]})
      } 
    }
}