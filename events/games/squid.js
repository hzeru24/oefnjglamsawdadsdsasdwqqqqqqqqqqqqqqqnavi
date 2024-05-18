const { MessageActionRow, MessageButton } = require('discord.js');
const client = require("../../index.js")


const PREFIX = '!squid'; // Change this to your desired prefix
const GAME_CHANNEL_ID = '892176134794522688'; // Replace with the actual channel ID

let players = [];
let currentRound = 0;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'join') {
    if (!players.includes(message.author.id)) {
      players.push(message.author.id);
      message.reply('You have joined the Squid Game.');
    } else {
      message.reply('You are already in the Squid Game.');
    }
  }

  if (command === 'start' && message.channel.id === GAME_CHANNEL_ID) {
    startGame(message.channel);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton() || !players.includes(interaction.customId)) return;

  const selectedButton = interaction.customId;

  if (selectedButton === 'danger') {
    const playerIndex = players.indexOf(interaction.user.id);
    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
      await interaction.reply(`Player ${interaction.user.tag} clicked the "Danger" button and is out of the game.`);
    }
  } else if (selectedButton === 'success') {
    interaction.reply(`Player ${interaction.user.tag} clicked the "Success" button!`);
  }
});

function startGame(channel) {
  if (players.length < 1) {
    return;
  }

  currentRound++;

  const shuffledPlayers = shuffleArray(players);
  const numButtonRows = Math.ceil(players.length / 5);

  const buttonRows = [];
  for (let i = 0; i < numButtonRows; i++) {
    const buttons = shuffledPlayers
      .slice(i * 5, (i + 1) * 5)
      .map((playerId) =>
        new MessageButton()
          .setCustomId(playerId)
          .setLabel('Run')
          .setStyle('SUCCESS')
      )
      .concat(
        new MessageButton()
          .setCustomId('danger')
          .setLabel('Danger')
          .setStyle('DANGER')
      );

    buttonRows.push(new MessageActionRow().addComponents(buttons));
  }

  const embed = {
    color: 'BLURPLE', // Change the color here as needed
    title: `Squid Game - Round ${currentRound}`,
    description: 'Click the "Run" button to make your move!\nClick the "Danger" button to exit the game.',
  };

  channel.send({ content: `Round ${currentRound}`, embeds: [embed], components: buttonRows });
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}