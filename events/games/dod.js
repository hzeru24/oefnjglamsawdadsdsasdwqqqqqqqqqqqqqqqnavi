const client = require("../../index.js")
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const PREFIX = "r!" || "R!"

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === `${PREFIX}deal`) {
    startDealGame(message);
  }
});


async function startDealGame(message) {
  const shuffledValues = shuffleArray(values);
  const embed = new MessageEmbed()
    .setTitle('Deal or No Deal')
    .setDescription('Welcome to Deal or No Deal!\n\nChoose a briefcase to keep as your own.');

  const buttonRows = [];
  const buttonsPerRow = 5;

  for (let i = 0; i < shuffledValues.length; i += buttonsPerRow) {
    const rowValues = shuffledValues.slice(i, i + buttonsPerRow);

    const row = new MessageActionRow()
      .addComponents(rowValues.map(value => new MessageButton()
        .setCustomId(`pick_${value}`)
        .setLabel(`${value}`)
        .setStyle('PRIMARY')));

    buttonRows.push(row);
  }

  const gameMessage = await message.channel.send({ embeds: [embed], components: buttonRows });

  const collector = gameMessage.createMessageComponentCollector({ time: 60000 });

  collector.on('collect', async (interaction) => {
    if (interaction.customId.startsWith('pick_')) {
      const pickedValue = parseInt(interaction.customId.split('_')[1]);
      const offer = Math.round(getAverageRemainingValue(shuffledValues, pickedValue) * 0.5);

      const offerEmbed = new MessageEmbed()
        .setTitle('Deal or No Deal')
        .setDescription(`You've picked Briefcase ${pickedValue}.\n\nThe banker offers you $${offer}. Deal or No Deal?`);

      const offerRow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`deal_${pickedValue}`)
            .setLabel('Deal')
            .setStyle('SUCCESS'),
          new MessageButton()
            .setCustomId(`nodeal_${pickedValue}`)
            .setLabel('No Deal')
            .setStyle('DANGER')
        );

      await interaction.update({ embeds: [offerEmbed], components: [offerRow] });
    } else if (interaction.customId.startsWith('deal_')) {
      const pickedValue = parseInt(interaction.customId.split('_')[1]);
      const endEmbed = new MessageEmbed()
        .setTitle('Deal or No Deal')
        .setDescription(`Congratulations! You've accepted the deal and won $${pickedValue}.`);

      await interaction.update({ embeds: [endEmbed], components: [] });
      collector.stop();
    } else if (interaction.customId.startsWith('nodeal_')) {
      const pickedValue = parseInt(interaction.customId.split('_')[1]);
      const continueEmbed = new MessageEmbed()
        .setTitle('Deal or No Deal')
        .setDescription(`You've declined the deal. Continue picking briefcases.`);

      const continueRow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId(`pick_${pickedValue}`)
            .setLabel(`Briefcase ${pickedValue}`)
            .setStyle('PRIMARY')
            .setDisabled()
        );

      await interaction.update({ embeds: [continueEmbed], components: [continueRow] });
    }
  });

  collector.on('end', (collected, reason) => {
    if (reason === 'time') {
      const endEmbed = new MessageEmbed()
        .setTitle('Deal or No Deal')
        .setDescription('Time is up! Your game session has ended.');

      gameMessage.edit({ embeds: [endEmbed], components: [] });
    }
  });
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function getAverageRemainingValue(array, removedValue) {
  const remainingValues = array.filter(value => value !== removedValue);
  const sum = remainingValues.reduce((total, value) => total + value, 0);
  return sum / remainingValues.length;
}
