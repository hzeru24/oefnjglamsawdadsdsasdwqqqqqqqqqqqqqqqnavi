const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../botconfig/main')
const { blank } = require('../../botconfig/main')

module.exports = {
  name: 'role',
  permissions: ['ADMINISTRATOR'],
  run: async (client, message, args) => {

    const embedhelp = new MessageEmbed()
      .setAuthor({name: `${client.user.username}` + " 's Help Menu", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
      .setDescription(`\`\`\`xml\n<Usage : ${prefix}role <subcommand> >\`\`\`Modify roles`)
      .addField("__Subcommands:__", "`add       :` Add role to a member\n`all       :` Add role to all members\n`bots      :` Add role to all bots\n`humans    :` Add role to all human members\n`info      :` Shows role information\n`random    :` Add role randomly to multiple members\n`rbots     :` Remove role from all bots\n`remove    :` Remove role from a member\n`rhumans   :` Remove role from all human members")
      .setColor(`${blank}`)
      .setTimestamp()
    if (!args[0]) return message.channel.send({ embeds: [embedhelp] })

    //   if(!args[0]) return message.channel.send(`**Invalid Input**\n\`\`\` ${prefix}role random <amount> <roleID>\`\`\``)

    if(args[0] === 'info') {
      if (!args[1]) return message.channel.send("Please enter a role!")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (!role) return message.channel.send("Please enter a valid role!");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleembed = new MessageEmbed()
          .setAuthor({name: `Role Info`})
          .setColor(`${role.hexColor}`)
          .setDescription(`Name: [${role.name}](https://discord.gg/ZAccJFvF8T)\nColor: [${role.hexColor}](https://discord.gg/ZAccJFvF8T)\nPosition: [${role.position}](https://discord.gg/ZAccJFvF8T)\nMentionable: [${status[role.mentionable]}](https://discord.gg/ZAccJFvF8T)\nMembers: [${role.members.size}](https://discord.gg/ZAccJFvF8T)\nCreatedAt: [${(role.createdAt.toDateString()).replace(" ", ", ")}](https://discord.gg/ZAccJFvF8T)`)
          .setFooter({text: `ID: ${role.id}`})

        message.channel.send({embeds: [roleembed]})
    }

    if (args[0] === 'rand' || args[0] === 'random') {

      let num = args[1]
      if (isNaN(num)) return message.channel.send('Please enter a valid amount!')
      if (num >= message.guild.memberCount) return message.channel.send(`Amount must not exceed the number of server members!`)
      if (num === 0) return message.channel.send('Amount must be greater than 0!')

      let role = message.guild.roles.cache.get(args[2])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to add ${role} to ${num} users...`, allowedMentions: { "users": [], "roles": [] } })
      for (let i = 0; i < num; i++) {
        let members = await message.guild.members.fetch();
        let mem = members.random()
        mem.roles.add(role)
      }
      mes.edit({ content: `Completed adding ${role} to ${num} users!`, allowedMentions: { "users": [], "roles": [] } })
    } // RANDOM RANDOM RANDOM RANDOM

    if (args[0] === 'add') {
      let user = message.guild.members.cache.get(args[1])
      if (!user || isNaN(user)) return message.channel.send('Please enter a valid user ID!')
      let role = message.guild.roles.cache.get(args[2])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      await user.roles.add(role)

      message.channel.send({ content: `${role} has been added to ${user}!`, allowedMentions: { "users": [], "roles": [] } })
    } // ADD ADD ADD ADD ADD ADD ADD
    if (args[0] === 'remove') {
      let user = message.guild.members.cache.get(args[1])
      if (!user || isNaN(user)) return message.channel.send('Please enter a valid user ID!')
      let role = message.guild.roles.cache.get(args[2])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      await user.roles.remove(role)

      message.channel.send({ content: `${role} has been removed from ${user}!`, allowedMentions: { "users": [], "roles": [] } })
    } // REMOVE REMOVE REMOVE REMOVE REMOVE
    if (args[0] === 'humans') {
      let role = message.guild.roles.cache.get(args[1])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to add ${role} to all members...`, allowedMentions: { "users": [], "roles": [] } })
      message.guild.members.cache
        .filter(member => !member.user.bot)
        .map(a => a.roles.add(role));

      mes.edit({ content: `${role} has been added to **all** human members!`, allowedMentions: { "users": [], "roles": [] } })
    } // HUMANS HUMANS HUMANS HUMANS HUMANS
    if (args[0] === 'rhumans') {
      let role = message.guild.roles.cache.get(args[1])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to remove ${role} from all human members...`, allowedMentions: { "users": [], "roles": [] } })
      message.guild.members.cache
        .filter(member => !member.user.bot)
        .map(a => a.roles.remove(role));

      mes.edit({ content: `${role} has been removed from **all** human members!`, allowedMentions: { "users": [], "roles": [] } })
    } // RHUMAN RHUMAN RHUMAN RHUMAN RHUMAN
    if (args[0] === 'bots') {
      let role = message.guild.roles.cache.get(args[1])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to add ${role} to all bots...`, allowedMentions: { "users": [], "roles": [] } })
      message.guild.members.cache
        .filter(member => member.user.bot)
        .map(a => a.roles.add(role));

      mes.edit({ content: `${role} has been added to **all** bots!`, allowedMentions: { "users": [], "roles": [] } })
    } // BOTS BOTS BOTS BOTS BOTS BTS
    if (args[0] === 'rbots') {
      let role = message.guild.roles.cache.get(args[1])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to remove ${role} to from bots...`, allowedMentions: { "users": [], "roles": [] } })
      message.guild.members.cache
        .filter(member => member.user.bot)
        .map(a => a.roles.remove(role));

      mes.edit({ content: `${role} has been removed from **all** bots!`, allowedMentions: { "users": [], "roles": [] } })
    } // RBOTS RBOTS RBOTS RBOTS RBOTS 
    if (args[0] === 'all') {
      let role = message.guild.roles.cache.get(args[1])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to add ${role} to all members...`, allowedMentions: { "users": [], "roles": [] } })
      const ad = message.guild.members.cache.forEach(member => member.roles.add(role))

      if(ad) {
        mes.edit({ content: `${role} has been added to **all** members!`, allowedMentions: { "users": [], "roles": [] } })
      }
    } // ADD ADD ADD ADD ADD ADD ADD
    if (args[0] === 'rall') {
      let role = message.guild.roles.cache.get(args[1])
      if (!role || isNaN(role)) return message.channel.send('Please enter a valid role ID!')
      const mes = await message.channel.send({ content: `Starting to remove ${role} to from members...`, allowedMentions: { "users": [], "roles": [] } })
      message.guild.members.cache.forEach(member => member.roles.remove(role))

      mes.edit({ content: `${role} has been removed from **all** members!`, allowedMentions: { "users": [], "roles": [] } })
    } // RALL RALL RALL RALL RALL

  }
}