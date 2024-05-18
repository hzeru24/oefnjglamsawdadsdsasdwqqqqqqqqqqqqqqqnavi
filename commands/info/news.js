const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');
const client = require('../../index.js');
const { blank } = require('../../botconfig/main.json');

module.exports = {
  name: 'news',
  run: async (client, message, args) => {
    const apiKey = process.env.newsAPI;
    if (args.length === 0) {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        const displayArticle = (index) => {
  const article = articles[index];
  const description = article.description && article.description.length > 200
    ? `${article.description.slice(0, 200)}... [Read more...](${article.url})`
    : article.description || 'No description available.';

  const newsEmbed = new MessageEmbed()
    .setColor(`${blank}`)
    .setTitle('Top News Headlines')
    .setDescription(`**${index + 1}. ${article.title}**\n${description}`)
    .setTimestamp();

  return newsEmbed;
};


        let pageIndex = 0;
        const maxPageIndex = articles.length - 1;

        const messageComponentRow = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('previous')
              .setLabel('Previous')
              .setStyle('PRIMARY')
              .setDisabled(pageIndex === 0),
            new MessageButton()
              .setCustomId('next')
              .setLabel('Next')
              .setStyle('PRIMARY')
              .setDisabled(pageIndex === maxPageIndex)
          );

        const messageReaction = await message.channel.send({ embeds: [displayArticle(pageIndex)], components: [messageComponentRow] });

        const filter = (interaction) => {
          return interaction.customId === 'previous' || interaction.customId === 'next';
        };

        const collector = messageReaction.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (interaction) => {
  if (interaction.customId === 'previous' && pageIndex > 0) {
    pageIndex--;
  } else if (interaction.customId === 'next' && pageIndex < maxPageIndex) {
    pageIndex++;
  }

  // Update disabled states of buttons
  messageComponentRow.components[0].setDisabled(pageIndex === 0);
  messageComponentRow.components[1].setDisabled(pageIndex === maxPageIndex);

  await interaction.update({ embeds: [displayArticle(pageIndex)], components: [messageComponentRow] });
});


        collector.on('end', () => {
          messageReaction.edit({ components: [] }).catch(error => console.error('Failed to remove components:', error));
        });
      } catch (error) {
        console.error('Error fetching news:', error);
        message.reply('An error occurred while fetching news.');
      }
    } else {
      message.reply('Invalid command format. Use `!news` to get top news headlines.');
    }
  },
};
