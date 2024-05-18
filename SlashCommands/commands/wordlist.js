const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { words } = require('../../schemas/dictionary2.json');

module.exports = {
  name: 'autocomplete',
  description: 'Search for words',
  options: [
    {
      type: "STRING",
      name: 'query',
      description: 'Search for words',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });

    if (interaction.guild.id === "821575403855544370") {
      return interaction.editReply("Oops! An error has occurred. Please try again later.");
    }

    const backId = 'back';
    const forwardId = 'forward';

    const backButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('Back')
      .setEmoji('⬅️')
      .setCustomId(backId);

    const forwardButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('Next')
      .setEmoji('➡️')
      .setCustomId(forwardId);

    const ar = interaction.options.getString('query');
    const guilds = words.filter(m => /^\w+$/.test(m) && m.includes(ar));

    if (!guilds.length) {
      return interaction.editReply(`Unable to find a word for ${ar}`);
    }

    const generateEmbed = start => {
      const current = guilds.slice(start, start + 20);

      const embed = new MessageEmbed({
        color: '#000000',
        title: `${start + 1}-${start + current.length} of ${guilds.length} words`
      });

      const wordsList = current.map(guild => `\`${guild}\``).join('\n');
      embed.setDescription(wordsList);

      return embed;
    };

    const canFitOnOnePage = guilds.length <= 20;
    const embedMessage = await interaction.editReply({
      embeds: [generateEmbed(0)],
      components: canFitOnOnePage ? [] : [new MessageActionRow().addComponents(forwardButton)],
    });

    if (canFitOnOnePage) return;

    const collector = embedMessage.createMessageComponentCollector({
      filter: ({ user }) => user.id === interaction.user.id
    });

    let currentIndex = 0;
    collector.on('collect', async inter => {
      currentIndex += inter.customId === backId ? -20 : 20;
      await inter.update({
        embeds: [generateEmbed(currentIndex)],
        components: [
          new MessageActionRow().addComponents(
            ...(currentIndex ? [backButton] : []),
            ...(currentIndex + 20 < guilds.length ? [forwardButton] : [])
          )
        ]
      });
    });

    const chan = interaction.client.channels.cache.get("1085122375265292340");
    chan.send(`<:w_dot:1047104723758624810> \`${interaction.user.tag}\` used </autocomplete:1052327696773951562> in **${interaction.guild.name}**`);
  }
};
