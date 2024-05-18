const advices = require('../../json/advices.json');
const { MessageEmbed } = require('discord.js');
const { blank } = require('../../botconfig/main.json');

module.exports = {
  name: 'advice',
  developersOnly: true,
  run: async (client, message, args) => {
    const category = args[0] ? args[0].toLowerCase() : 'love';
    const adviceCategory = advices[category];

    if (!adviceCategory) {
      return message.reply('Invalid advice category. Please choose "love" or "life".');
    }

    const randomAdvice = getRandomAdvice(adviceCategory);
    const embed = new MessageEmbed()
      .setColor(blank)
      .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Advice`)
      .setDescription(randomAdvice);

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};

function getRandomAdvice(advicesList) {
  const randomIndex = Math.floor(Math.random() * advicesList.length);
  return advicesList[randomIndex];
}
