const {MessageActionRow, MessageButton, MessageEmbed, MessageAttachment} = require ('discord.js')
const fetch = require('node-fetch')
const { prefix } = require('../../botconfig/main')
const { blank } = require("../../botconfig/main.json")

module.exports = {
  name: "animals",
  aliases: [],
  timeout: 3,
  permissions: ['SEND_MESSAGES'],
  run: async (client, message, args) => {

        const embedhelp = new MessageEmbed()
      .setAuthor({name: `${client.user.username}` + " 's Help Menu", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
      .setDescription(`\`\`\`xml\n<Usage : ${prefix}animals <subcommand> >\`\`\``)
      .addField("__Subcommands:__", "`bird      :` Sends a bird image\n`cat       :` Sends a cat image\n`dog       :` Sends a dog image\n`fox       :` Sends a fox image\n`kangaroo  :` Sends a kangaroo image\n`koala     :` Sends a koala image\n`panda     :` Sends a panda image\n`redpanda  :` Sends a red panda image\n`shiba     :` Sends a shiba inu image")
      .setColor(`${blank}`)
      .setTimestamp()
    if (!args[0]) return message.channel.send({ embeds: [embedhelp] })

    //if(args[0] === 'bird') {}

    if(args[0] === 'bird') {
      try {
            const res = await fetch('http://shibe.online/api/birds');
    const img = (await res.json())[0];

            const embed = new MessageEmbed()
            .setTitle(`🐦 Birdy!!! 🐦`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a bird pls try again after a few times!`)
        }
    }
      if(args[0] === 'cat') {
        const res = await fetch('https://some-random-api.ml/img/cat');
    const img = (await res.json()).link;

    const embed = new MessageEmbed()
    .setTitle(`🐱 Meow!!! 🐱`)
    .setImage(img)
    .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
    .setTimestamp()
            .setColor(`${blank}`)
    message.channel.send({embeds: [embed]});
      }
    if(args[0] === 'dog') {
      try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;

            const embed = new MessageEmbed()
            .setTitle(`🐶 Doggo!!! 🐶`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a dog pls try again after a few times!`)
        }
    }
    if(args[0] === 'fox') {
      try {
            const res = await fetch('https://randomfox.ca/floof/');
            const img = (await res.json()).image;

            const embed = new MessageEmbed()
            .setTitle(`🦊 Foxxy!!! 🦊`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a fox pls try again after a few times!`)
        }
    }
    if(args[0] === 'kangaroo') {
      try {
            const res = await fetch('https://some-random-api.ml/img/kangaroo');
    const img = (await res.json()).link;

    const embed = new MessageEmbed()
    .setTitle(`🦘 Kangaroo!!! 🦘`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a kangaroo pls try again after a few times!`)
        }
    }
    if(args[0] === 'koala') {
      try {
            const res = await fetch('https://some-random-api.ml/img/koala');
    const img = (await res.json()).link;

    const embed = new MessageEmbed()
    .setTitle(`🐨 Koala!!! 🐨`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a koala pls try again after a few times!`)
        }
    }
    if(args[0] === 'panda') {
      try {
            const res = await fetch('https://some-random-api.ml/img/panda');
    const img = (await res.json()).link;

    const embed = new MessageEmbed()
    .setTitle(`🐼 Panda!!! 🐼`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a panda pls try again after a few times!`)
        }
    }
   /* if(args[0] === 'raccoon') {
      try {
            const res = await fetch('https://some-random-api.ml/img/racoon');
    const img = (await res.json()).link;

    const embed = new MessageEmbed()
    .setTitle(`🦝 Raccoon!!! 🦝`)
            .setImage(img)
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Requested by ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } catch (err) {
            message.reply(`Couldn't find a raccoon pls try again after a few times!`)
        }
    } */
    if(args[0] === 'redpanda') {
      try {
            const res = await fetch('https://some-random-api.ml/img/red_panda');
    const img = (await res.json()).link;

    const embed = new MessageEmbed()
    .setTitle(`🐼 Red panda!!! 🐼`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()
            message.channel.send({embeds: [embed]})
        } catch (err) {
            message.reply(`Couldn't find a red panda pls try again after a few times!`)
        }
    }
    if(args[0] === 'shiba') {
      try {
            const res = await fetch('http://shibe.online/api/shibes');
            const img = (await res.json())[0];

            const embed = new MessageEmbed()
            .setTitle(`🐕 Shiba!!! 🐕`)
            .setImage(img)
            .setColor(`${blank}`)
            .setFooter({text: `Requested by ${message.author.username}`,  iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTimestamp()
            message.channel.send({embeds: [embed]})
        } catch (err) {
            message.reply(`Couldn't find a shibe pls try again after a few times!`)
        }
    }
      
 }
}