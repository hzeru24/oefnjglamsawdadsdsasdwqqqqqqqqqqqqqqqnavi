const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { words } = require('../../schemas/dictionary2.json')
const wordnet = require('wordnet')
module.exports = {
  name: 'dictionary',
  description: 'Wordnet dictionary',
  options: [
    {
      type: "STRING",
      name: 'query',
      description: 'Search for words',
      required: true,
    /*  choices: [
          {
            name: "Top 20 words",
            value: "twenty"
          },
          {
            name: "All words",
            value: "all"
          },
        ] */

    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {

    await interaction.deferReply({ephemeral: true});

    if(interaction.guild.id == "821575403855544370") return interaction.editReply("Oops! An error has occured. Please try again later.")
    
const backId = 'back'
const forwardId = 'forward'
const backButton = new MessageButton({
  style: 'SECONDARY',
  label: 'Back',
  emoji: '911282961444392980',
  customId: backId
})
const forwardButton = new MessageButton({
  style: 'SECONDARY',
  label: 'Next',
  emoji: '911283041031311360',
  customId: forwardId
})

// Put the following code wherever you want to send the embed pages:

    const ar = interaction.options.getString('query');

    
    await wordnet.init();

  let results = await wordnet.list();

    const guilds = results.filter(m => /^\w+$/.test(m) && m.includes(ar));
   if(!guilds) return interaction.editReply(`Unable to find a word for ${ar}`)
/**
 * Creates an embed with guilds starting from an index.
 * @param {number} start The index to start from.
 * @returns {Promise<MessageEmbed>}
 */
const generateEmbed = async start => {
  const current = guilds.slice(start, start + 5)

  // You can of course customise this embed however you want
  return new MessageEmbed({
    color: '#000000',
    title: `${start + 1}-${start + current.length} of ${
      guilds.length
    } words`,
    fields: await Promise.all(
      current.map(async guild => ({
        name: 'word',
        value: `${(await guild)}`
      }))
    )
  })
}//`${Words.sort((a, b) => b.length - a.length).map(r => r).map((r, i) => `**${i + 1}** - ${r}`).slice(0, 20).join("\n")}`

// Send the embed with the first 10 guilds
const canFitOnOnePage = guilds.length <= 10
const embedMessage = await interaction.editReply({
  embeds: [await generateEmbed(0)],
  components: canFitOnOnePage
    ? []
    : [new MessageActionRow({components: [forwardButton]})]
})
// Exit if there is only one page of guilds (no need for all of this)
if (canFitOnOnePage) return

// Collect button interactions (when a user clicks a button),
// but only when the button as clicked by the original message author
const collector = embedMessage.createMessageComponentCollector({
  filter: ({user}) => user.id === interaction.user.id
}) //author

let currentIndex = 0
collector.on('collect', async inter => {
  // Increase/decrease index
  inter.customId === backId ? (currentIndex -= 5) : (currentIndex += 5)
  // Respond to interaction by updating message with new embed
  await inter.update({
    embeds: [await generateEmbed(currentIndex)],
    components: [
      new MessageActionRow({
        components: [
          // back button if it isn't the start
          ...(currentIndex ? [backButton] : []),
          // forward button if it isn't the end
          ...(currentIndex + 5 < guilds.length ? [forwardButton] : [])
        ]
      })
    ]
  })
})
    const chan = interaction.client.channels.cache.get("1085122375265292340")
    chan.send({content: "<:w_dot:1047104723758624810>  " + `\`${interaction.user.tag}\` used </autocomplete:1052327696773951562> in **${interaction.guild.name}**`})
  }
}