const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../botconfig/main')

module.exports = {
  name: 'addroletorandom',
  permissions: ['ADMINISTRATOR'],
  run: async(client, message, args) => {

    if(!args[0]) return message.channel.send(`**Invalid Input**\n\`\`\`autohotkey\n ${prefix}role random <amount> <roleID>\`\`\``)

    if(!args[0]) return message.channel.send({embeds: [embedhelp]})

 //   if(!args[0]) return message.channel.send(`**Invalid Input**\n\`\`\` ${prefix}role random <amount> <roleID>\`\`\``)

    if(args[0] === 'rand' || args[0] === 'random') {

    let num = args[1]
    if(isNaN(num)) return message.channel.send('Please enter a valid amount!')
      if(num >= message.guild.memberCount) return message.channel.send(`Amount must not exceed the number of server members!`)
      if(num === 0) return message.channel.send('Amount must be greater than 0!')
    
    let role = message.guild.roles.cache.get(args[2]) 
    if(!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
     const mes = await message.channel.send({content: `Starting to add ${role} to ${num} users...`, allowedMentions: { "users" : [], "roles": []}})
    for (let i = 0; i < num; i++) {
      let members = await message.guild.members.fetch();
      let mem = members.random()
      mem.roles.add(role)   
}
      mes.edit({content: `Completed adding ${role} to ${num} users!`, allowedMentions: { "users" : [], "roles": []}})
    }
    /* starting to add @role in "amount" users 
completed adding "role" to "num" users */
    
  }
}