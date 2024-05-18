const { MessageEmbed } = require('discord.js')
const { theme } = require('../../botconfig/main')

module.exports = {
    name: "simprate",
    description: "simp rate",
    permissions: ["SEND_MESSAGES"],

    run: async (client, message, args) => {

    if(message.author.bot) return;
  
  let rate = Math.floor(Math.random() * 100);
  
  let user = message.mentions.users.first() || message.author
  
  let embed = new MessageEmbed()
  .setTitle("Simp rate machine")
  .setColor(`${theme}`)
  .setDescription(`**${user.username}** is ` + rate + "% simp");

  message.channel.send({ embeds: [embed] })
}
    }