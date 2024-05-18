const { MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const blank = "#2f3136"

const Highlight = require("../../schemas/highlightUser") 

const client = require('../../index.js')

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const highlightedUsers = await Highlight.find({ highlightedUsers: message.author.id });

  if (highlightedUsers.length > 0) {
    const embed = new MessageEmbed()
      .setColor(`${blank}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`[${message.content}](${message.url})`)
      .setTimestamp();

    for (const highlightedUser of highlightedUsers) {
      const user = await message.guild.members.fetch(highlightedUser.userId);
      if (user) {
        user.send({ embeds: [embed] });
      }
    }
  }
});