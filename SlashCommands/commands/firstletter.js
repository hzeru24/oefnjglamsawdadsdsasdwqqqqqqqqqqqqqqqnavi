const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { words } = require('../../schemas/dictionary2.json');

module.exports = {
  name: 'firstletter',
  description: 'Search for words that start with a given letter',
  options: [
    {
      type: "STRING",
      name: 'query',
      description: 'Search for words that start with a specific letter',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const ar = interaction.options.getString('query').toLowerCase();

    const wordss = words.filter(word => word.toLowerCase().startsWith(ar));

    if (!wordss.length) {
      return interaction.editReply(`No words found that start with '${ar}'.`);
    }

    const wordsPerPage = 20;
    let page = 1;
    let startIdx = (page - 1) * wordsPerPage;
    let endIdx = startIdx + wordsPerPage;
    
    const backButton = new MessageButton()
      .setCustomId('back')
      .setLabel('Back')
      .setStyle('SECONDARY');
      
    const forwardButton = new MessageButton()
      .setCustomId('forward')
      .setLabel('Next')
      .setStyle('SECONDARY');

    const buttonsRow = new MessageActionRow()
      .addComponents(backButton, forwardButton);

    const generateEmbed = () => {
      const wordsSubset = wordss.slice(startIdx, endIdx);
      const description = wordsSubset.join('\n');
      
      return new MessageEmbed()
        .setColor('#000000')
        .setTitle(`${wordss.length} words found`)
        .setDescription(description);
    };

    const embedMessage = await interaction.editReply({
      embeds: [generateEmbed()],
      components: [buttonsRow]
    });

    const collector = embedMessage.createMessageComponentCollector({ filter: i => i.user.id === interaction.user.id });

    collector.on('collect', async i => {
      if (i.customId === 'back') {
        page = Math.max(page - 1, 1);
      } else if (i.customId === 'forward') {
        page = Math.min(page + 1, Math.ceil(wordss.length / wordsPerPage));
      }
      
      startIdx = (page - 1) * wordsPerPage;
      endIdx = startIdx + wordsPerPage;

      await i.update({
        embeds: [generateEmbed()],
        components: [buttonsRow]
      });
    });

    
    const chan = interaction.client.channels.cache.get("1085122375265292340");
    chan.send(`<:w_dot:1047104723758624810> \`${interaction.user.tag}\` used </firstletter:1052327696773951560> in **${interaction.guild.name}**`);
  }
};
