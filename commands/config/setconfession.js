const Schema = require('../../schemas/confessions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'set-confession-channel',
  aliases: ['setconfessionchannel', 'setconfession'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   run: async(client, message, args) => {
     if(!message.member.permissions.has('ADMINISTRATOR')) return;
     
     const channel = message.mentions.channels.first();
     if(!channel) return message.reply('Please mention a channel!');
     
     Schema.findOne({ guild: message.guild.id }, async(err, data) => {
       if(data) {
         data.channel = channel.id;
         data.save();
       } else {
         new Schema({
           Guild: message.guild.id,
           Channel: channel.id,
         }).save();
       }
       message.reply(`${channel} has been set to as the confession channel!`);
     });
   },
};  
