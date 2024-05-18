const { MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } = require('discord.js');
const schema = require('../../schemas/highlightUser');
const { blank } = require('../../botconfig/main');

module.exports = {
  name: 'highlightuser',
  aliases: ["highlight"],
  timeout: 0,
  permissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send({ content: "Please provide a subcommand: `add`, `list`, or `remove`." });
    }

    if (args[0] === 'add') {
      const targetUserId = args[1];

      if (!targetUserId) {
        return message.reply('Please provide a user ID to highlight.');
      }

      let data;
      try {
        data = await schema.findOne({
          userId: message.author.id,
          guildId: message.guild.id,
        });

        if (!data) {
          data = await schema.create({
            userId: message.author.id,
            guildId: message.guild.id,
            time: Date.now(),
            highlightedUsers: [targetUserId],
          });
        } else {
          if (!data.highlightedUsers.includes(targetUserId)) {
            data.highlightedUsers.push(targetUserId);
          }
        }

        await data.save();
        message.reply(`User with ID ${targetUserId} has been highlighted.`);
      } catch (e) {
        console.error(e);
      }
    }

    if (args[0] === 'list') {
      const user = await schema.findOne({ userId: message.author.id, guildId: message.guild.id });

      if (!user || user.highlightedUsers.length === 0) {
        return message.reply('You have not highlighted any users.');
      }

      const highlightedUserTags = user.highlightedUsers.map((userId) => `<@${userId}>`).join(', ');

      const embed = new MessageEmbed()
        .setColor(`${blank}`)
        .setTitle('Highlighted Users')
        .setDescription(highlightedUserTags);

      message.reply({ embeds: [embed] });
    }

    if (args[0] === 'remove') {
      const targetUserId = args[1];

      if (!targetUserId) {
        return message.reply('Please provide a user ID to remove from highlights.');
      }

      const user = await schema.findOne({ userId: message.author.id, guildId: message.guild.id });

      if (!user || !user.highlightedUsers.includes(targetUserId)) {
        return message.reply('User is not highlighted.');
      }

      user.highlightedUsers = user.highlightedUsers.filter((userId) => userId !== targetUserId);
      await user.save();

      message.reply(`User with ID ${targetUserId} has been removed from highlights.`);
    }
  }
};
