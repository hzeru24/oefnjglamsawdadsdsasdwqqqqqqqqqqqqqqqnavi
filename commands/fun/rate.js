const { MessageEmbed } = require('discord.js')
const { theme } = require('../../botconfig/main')
const { prefix } = require('../../botconfig/main')
const { blank } = require("../../botconfig/main.json")
    
module.exports = {
    name: "rate",
    description: "Rate someone",
    permissions: ["SEND_MESSAGES"],

    run: async (client, message, args) => {
      const embedhelp = new MessageEmbed()
      .setAuthor({name: `${client.user.username}` + " 's Help Menu", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
      .setDescription(`\`\`\`xml\n<Usage : ${prefix}rate <subcommand> [user] >\`\`\`Rate someone!`)
      .addField("__Subcommands:__", "`bad`, `clown`, `cute`, `furry`, `gay`, `good`, `hot`, `noob`, `pro`, `smart`, `tall`, `waifu`")
      .setColor(`${blank}`)
      .setTimestamp()
    if (!args[0]) return message.channel.send({ embeds: [embedhelp] })
      let rate = Math.floor(Math.random() * 100)
    if(args[0] === 'bad') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** bad! <a:chikashook:891257293587480596>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'clown') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** clown! <a:wazowskispin:967731450097066004>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'cute') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** cute! <:kannaok:890397867699748884>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'furry') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** furry! <a:owaowa:1040443638271983636>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'gay') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** gay! <:itsokayimgay:974238620091293707>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'good') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** good! <a:umaruehe:891257154231763005>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'hot') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** hot! <a:danceap:829020615582154783>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'noob') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** noob! <:yujihmm:890398798591971370>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'pro') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** pro! <:mugistrong:890400733306978385>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'smart') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** smart! <a:hanekawasmug:825521922396651530>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'tall') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** tall! <:kannapat:900278825039052810>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] === 'waifu') {
      let user = message.mentions.members.first() || message.member
  let embed = new MessageEmbed()
  .setTitle(client.user.username + " rate machine")
  .setColor(`${blank}`)
  .setDescription(`${user.nickname || user.user.username} is **${rate}%** waifu! <a:cheer:849178546634752021>`);
  message.channel.send({ embeds: [embed] })
    } else if(args[0] ==! 'bad' || 'clown' || 'cute' || 'furry' || 'gay' || 'good' || 'hot' || 'noob' || 'pro' || 'smart' || 'tall' || 'waifu') return message.channel.send({ embeds: [embedhelp]})


      
    }
}