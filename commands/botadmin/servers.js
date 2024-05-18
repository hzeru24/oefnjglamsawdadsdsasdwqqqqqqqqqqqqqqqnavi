const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
  name: "servers",
  aliases: ["serverlist"],
  permissions: ['SEND_MESSAGES'],
  developersOnly: true,
  run: async (client, message, args) => {
    const backId = 'back'
    const forwardId = 'forward'
    const backButton = new MessageButton({
      style: 'SECONDARY',
      emoji: '◀️',
      customId: backId,
    })
    const dbackButton = new MessageButton({
      style: 'SECONDARY',
      emoji: '◀️',
      customId: 'dbackId',
      disabled: true
    })
    const forwardButton = new MessageButton({
      style: 'SECONDARY',
      emoji: '▶',
      customId: forwardId
    })
    const dforwardButton = new MessageButton({
      style: 'SECONDARY',
      emoji: '▶',
      customId: 'dforwardId',
      disabled: true
    })
    const close = new MessageButton({
      style: 'DANGER',
      emoji: '✖',
      customId: 'close'
    })

    // Put the following code wherever you want to send the embed pages:

    const { author, channel } = message
    const guilds = [...client.guilds.cache.values()]

    /**
     * Creates an embed with guilds starting from an index.
     * @param {number} start The index to start from.
     * @returns {Promise<MessageEmbed>}
     */
    const generateEmbed = async start => {
      const current = guilds.slice(start, start + 10)

      // You can of course customise this embed however you want
      return new MessageEmbed({
        color: '#000000',
        title: `${start + 1}-${start + current.length} of ${guilds.length
          } servers`,
        fields: await Promise.all(
          current.map(async guild => ({
            name: `${guild.name} | ${guild.memberCount} members`,
            value: `ID: ${guild.id}\nCreated <t:${Math.floor(await guild.createdTimestamp / 1000)}:R>\nOwned by <@!${(await guild.fetchOwner()).user.id}>`,
            inline: true

          }))
        )
      })

      //  return new MessageEmbed()
      //        .setTitle('Server List')
      //        .setFooter(`${start + 1}-${start + current.length} of ${
      //      guilds.length
      //    } servers`)
      //        .setDescription(await Promise.all(
      //      current.map(async guild => ({
      //        value: `${guild.name} (\`${guild.id}\`) | ${guild.memberCount}`
      //      }))
      //    ))
      //       .setColor('#000000')
    }




    // Send the embed with the first 10 guilds
    const canFitOnOnePage = guilds.length <= 10
    const embedMessage = await channel.send({
      embeds: [await generateEmbed(0)],
      components: canFitOnOnePage
        ? []
        : [new MessageActionRow({ components: [forwardButton, close] })]
    })
    // Exit if there is only one page of guilds (no need for all of this)
    if (canFitOnOnePage) return

    // Collect button interactions (when a user clicks a button),
    // but only when the button as clicked by the original message author
    const collector = embedMessage.createMessageComponentCollector({
      filter: ({ user }) => user.id === author.id
    })

    let currentIndex = 0
    collector.on('collect', async interaction => {

      if (interaction.customId === 'close') {
        await embedMessage.delete()
      }

      // Increase/decrease index
      interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
      // Respond to interaction by updating message with new embed
      await interaction.update({
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [
              // back button if it isn't the start
              ...(currentIndex ? [backButton, close] : []),
              // forward button if it isn't the end
              ...(currentIndex + 10 < guilds.length ? [forwardButton, close] : [])
            ]
          })
        ]
      })
    })
  }
}