const { Client, Intents } = require('discord.js');
const { DateTime } = require('luxon');
const Timezone = require('../../schemas/time');

module.exports = {
  name: 'time',
  description: 'Display current time and set timezone.',
  run: async (client, message, args) => {
    if (message.author.bot) return;

    const command = args[0];
    const mentionedUser = message.mentions.users.first();

    if (command === 'me') {
      const timezone = args.slice(1).join(' ');

      if (!timezone) {
        await message.reply('Please provide a valid timezone [continent/city].\nExample, `r!time me asia/manila`');
        return;
      }

      const existingTimezone = await Timezone.findOne({ userId: message.author.id });

      if (existingTimezone) {
        existingTimezone.timezone = toTitleCase(timezone);
        await existingTimezone.save();
      } else {
        const newTimezone = new Timezone({
          userId: message.author.id,
          timezone: toTitleCase(timezone),
        });
        await newTimezone.save();
      }

      await message.reply(`Your timezone has been set to **${toTitleCase(timezone)}**`);
    } else {
      const userTimezone = mentionedUser ? await Timezone.findOne({ userId: mentionedUser.id }) : await Timezone.findOne({ userId: message.author.id });

      if (userTimezone) {
        const currentTime = DateTime.now().setZone(userTimezone.timezone);
        const formattedTime = currentTime.toFormat('**hh:mm a dd-MMMM-yyyy** z (**ZZZZ**)');
        const unixTimestamp = Math.floor(currentTime.toMillis() / 1000);

        if (mentionedUser) {
          await message.reply(`${mentionedUser.username}'s current timezone is **${toTitleCase(userTimezone.timezone)}**.\nThe current time is: ${formattedTime}\n<t:${unixTimestamp}:f>`);
        } else {
          await message.reply(`Your current timezone is **${toTitleCase(userTimezone.timezone)}**.\nThe current time is: ${formattedTime}\n<t:${unixTimestamp}:f>`);
        }
      } else {
        if (mentionedUser) {
          await message.reply(`${mentionedUser.username}'s timezone is not set.`);
        } else {
          await message.reply('Your timezone is not set. Use `r!time me [continent/city]` to set your timezone.');
        }
      }
    }
  },
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
