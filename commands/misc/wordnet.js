const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wordnet = require('wordnet');

module.exports = {
  name: 'wordnet',
  description: 'List all possible words alphabetically using WordNet',
  run: (client, message, args) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const wordsPerPage = 10;

    let currentPage = 0;
    const navigationRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('previous')
          .setLabel('Previous')
          .setStyle('PRIMARY')
          .setDisabled(currentPage === 0),
        new MessageButton()
          .setCustomId('next')
          .setLabel('Next')
          .setStyle('PRIMARY')
      );

    const messageContent = `List of words (A-Z):`;

    const wordListEmbeds = [];
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      const words = wordnet.lookupByLetter(letter);

      const wordsFormatted = words.map((wordObj) => wordObj.lemma).join('\n');
      wordListEmbeds.push(new MessageEmbed().setDescription(wordsFormatted).setColor('#3498db'));
    }

    message.channel.send({
      content: messageContent,
      embeds: [wordListEmbeds[currentPage]],
      components: [navigationRow]
    }).then((messageSent) => {
      const filter = (interaction) => interaction.customId === 'previous' || interaction.customId === 'next';
      const collector = messageSent.createMessageComponentCollector({ filter });

      collector.on('collect', (interaction) => {
        if (interaction.customId === 'previous' && currentPage > 0) {
          currentPage--;
        } else if (interaction.customId === 'next' && currentPage < wordListEmbeds.length - 1) {
          currentPage++;
        }

        interaction.update({
          content: messageContent,
          embeds: [wordListEmbeds[currentPage]],
          components: [navigationRow]
        });
      });
    });
  }
};
