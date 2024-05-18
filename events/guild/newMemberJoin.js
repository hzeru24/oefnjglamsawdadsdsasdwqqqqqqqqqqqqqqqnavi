/*
const client = require('../../index');
const { MessageEmbed, MessageAttachment } = require("discord.js");
client.on('guildMemberAdd', async(member) => {
  
   let  bg = 'https://media.discordapp.net/attachments/908270986665803816/921051784536023110/F32351CF-CB53-41CE-90AA-E7985B656D05.png?width=1038&height=597'
// defining the member's avatar with "PNG" as format.
let  avatar = member.user.displayAvatarURL({ format:  "png" })

  const emb = new MessageEmbed()
  .setAuthor({name: `Welcome ${member.user.tag}`, iconURL: `${member.guild.iconURL({dynamic: true})}`})
  .setColor("#ffa6c9")
  .setThumbnail(`${avatar}`)
  .setDescription("- <#813542272829358110>/n<#945906442429399092>")

client.channels.cache.get("1130794713277026356").send({embeds: [emb]})
  
})

*/