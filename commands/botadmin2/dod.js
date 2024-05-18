const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require('discord.js')
const { prefix } = require('../../botconfig/main')
const { blank } = require("../../botconfig/main.json")

module.exports = {
    name: 'dealornodeal',
    aliases: ['dond', 'mysterybox'],
    description: 'Play mystery box game.',
    category: 'utility',
    run: async (client, message, args) => {
      const list = args.join(' ')
      if (!list)
            return message.reply(
                `Please enter the items`
            )
        const embed = new MessageEmbed()
            .setAuthor({name: 'Mystery Box Game', iconURL: "https://media.discordapp.net/attachments/892176134794522688/1078869513279377438/mys.gif"})
            .setFooter('Click the button of your number of choice')
            .setColor(`${blank}`)
        const components = [new MessageActionRow(), new MessageActionRow()]

        const array = [
            ['Box #1', `\`${list.split(',')[0] || "none"}\``],
            ['Box #2', `\`${list.split(',')[1] || "none"}\``],
            ['Box #3', `\`${list.split(',')[2] || "none"}\``],
            ['Box #4', `\`${list.split(',')[3] || "none"}\``],
            ['Box #5', `\`${list.split(',')[4] || "none"}\``],
            ['Box #6', `\`${list.split(',')[5] || "none"}\``],
            ['Box #7', `\`${list.split(',')[6] || "none"}\``],
            ['Box #8', `\`${list.split(',')[7] || "none"}\``],
            ['Box #9', `\`${list.split(',')[8] || "none"}\``],
            ['Box #10', `\`${list.split(',')[9] || "none"}\``],
        ]
        for (const val of array) {
            embed.addField(
                val[0], val[1], true
            )
            if (components[0].components.length < 5) {
                components[0].addComponents([
                    new MessageButton()
                        .setLabel(val[0])
                        .setStyle('SECONDARY')
                        .setCustomId(
                            `${(Math.random() + 1).toString(36).substring(2)}:${val[1]
                            }`
                        ),
                ])
            } else {
                components[1].addComponents([
                    new MessageButton()
                        .setLabel(val[0])
                        .setStyle('SECONDARY')
                        .setCustomId(
                            `${(Math.random() + 1).toString(36).substring(2)}:${val[1]
                            }`
                        ),
                ])
            }
        }

        const m = await message.channel.send({
            embeds: [embed],
            components,
        })
        const collector = m.createMessageComponentCollector({
          /*  filter: (b) => {
                if (b.user.id !== message.author.id) {
                    return b.reply({
                        content: `This isn't for you!`,
                        ephemeral: true,
                    })
                } else return true
            },*/
            time: 30000,
          max: 1,
        })

        collector.on('collect', async (b) => {
            const id = b.customId.split(':')[1]
            b.deferUpdate()
            return message.channel.send({
                content: `${id}`,
            })
        })
        collector.on('end', () => {
            m.components.forEach((com) => {
                com.components.forEach((c) => {
                    c.setDisabled()
                })
            })
            m.edit({
                components: m.components,
            })
        })
    },
}