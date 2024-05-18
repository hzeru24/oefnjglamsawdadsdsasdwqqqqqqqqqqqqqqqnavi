const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const client = require("../../index.js")

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('r!timer')) {
    const args = message.content.split(/ +/);
    if (args.length !== 2) {
      return message.reply('Usage: r!timer <duration>');
    }

    const duration = parseDuration(args[1]);
    if (!duration) {
      return message.reply('Invalid duration format. Please use a valid format (e.g., 10s, 2m, 3h, 1d).');
    }

    const endTime = Date.now() + duration;

    const notifyButton = new MessageButton()
      .setCustomId('notify')
      .setLabel('Notify Me')
      .setStyle('PRIMARY');

    const timerEmbed = new MessageEmbed()
      .setTitle('Timer')
      .setDescription(`Countdown: ${formatDuration(duration)}`)
      .setColor('BLUE');

    const timerMessage = await message.reply({ embeds: [timerEmbed], components: [new MessageActionRow().addComponents(notifyButton)] });

    const countdownInterval = setInterval(() => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        const mentionedUsers = timerMessage.mentions.users.map(user => `<@${user.id}>`).join(' ');
        timerMessage.edit(`Time's up! ${mentionedUsers}`);
      } else {
        timerEmbed.setDescription(`Countdown: ${formatDuration(remainingTime)}`);
        timerMessage.edit({ embeds: [timerEmbed], components: [new MessageActionRow().addComponents(notifyButton)] });
      }
    }, 1000);
  }
});


function parseDuration(durationString) {
  const regex = /(\d+)([smhd])/;
  const match = durationString.match(regex);

  if (!match) {
    return null;
  }

  const amount = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return amount * 1000;
    case 'm':
      return amount * 60 * 1000;
    case 'h':
      return amount * 60 * 60 * 1000;
    case 'd':
      return amount * 24 * 60 * 60 * 1000;
    default:
      return null;
  }
}

function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let formattedDuration = '';
  if (days > 0) formattedDuration += `${days} day${days > 1 ? 's' : ''}`;
  else if (hours > 0) formattedDuration += `${hours} hour${hours > 1 ? 's' : ''}`;
  else if (minutes > 0) formattedDuration += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  else if (seconds > 0) formattedDuration += `${seconds} second${seconds > 1 ? 's' : ''}`;
  else formattedDuration += 'Timer has ended.';

  return formattedDuration;
}
