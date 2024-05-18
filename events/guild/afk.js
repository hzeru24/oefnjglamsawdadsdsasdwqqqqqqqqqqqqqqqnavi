const client = require("../../index")
let emo = require("../../emojis")
const moment = require("moment")
const { MessageEmbed } = require("discord.js")

const AFKS = require("../../schemas/afk")

const prettyMilliseconds = require('pretty-ms');

client.on('messageCreate', async(message) => {

  if(!message.guild || message.author.bot) return;

  const ping = message.mentions.members.first();
  if(ping) {
    let data;
    try {
      data = await AFKS.findOne({
            userId: message.mentions.members.first().id,
            guildId: message.guild.id
        })
    } catch (e) {
      console.error(e)
    }

    if(data) {
      let timestamp = data.time;
      let reason = data.AFK_Reason;
      const timeAgo = prettyMilliseconds(Math.floor(Date.now() - data.time), {verbose: true, compact: true})
      
      let embed = new MessageEmbed()
      .setAuthor({name: `${ping.user.username} is AFK`, iconURL: `${ping.user.displayAvatarURL({dynamic:true})}`})
      .setDescription(`"${reason}"`)
      .setColor("#ffdb58")
      .setFooter({text: `AFK since ${timeAgo} ago`})
      message.channel.send({embeds: [embed]}).then(sentMessage => {
        setTimeout(() => sentMessage.delete(), 15000)
      })
    }
  }

  let getData;
  try {
    getData = await AFKS.findOne({
            userId: message.author.id,
            guildId: message.guild.id
        })
  } catch (e) {
    console.error()
  }
  if(getData) {
    let data = getData;
    let timestamp = data.time
    let reason = data.AFK_Reason
    const timeAgo = prettyMilliseconds(Math.floor(Date.now() - getData.time), {verbose: true, compact: true})
    const ping = message.mentions.members.first();
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}'s no longer AFK`})
    .setDescription(`You've been AFK for about ${timeAgo} for:\n\n"${reason}"`)
    .setColor('#ffdb58')
    if(message.content.toLowerCase().startsWith("=afk")) return;
    let deletedData;
    try {
      deletedData = await AFKS.deleteOne({
        userId: message.author.id,
        guildId: message.guild.id
      })
    } catch (e) {
      console.error(e)
    }
    let nick = message.member.displayName.replace("[AFK]", "")
    let afkRole = message.guild.roles.cache.find(role => role.name === 'AFK');
    message.reply({embeds: [embed]})
    if(!afkRole) return;
    message.member.roles.remove(afkRole)

    if(message.author.id == message.guild.ownerId) return;
    message.member.setNickname(nick)
  }
  })