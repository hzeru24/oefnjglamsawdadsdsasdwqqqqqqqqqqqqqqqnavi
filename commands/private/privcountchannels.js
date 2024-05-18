const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js')

module.exports = {
  name: 'countchannels',
  description: "Count a server's number of channels",
  developersOnly: true,
  run: async ( client, message, args ) => {
    let guildId = args[0] || message.guild.id
    let guild = client.guilds.cache.find((g) => g.id === guildId);
    const channels = [] // create starting array

guild.channels.cache // get all channels
  .filter((channel) => channel.type !== "category") // filter out the categories (they are also counted as channels)
  .forEach((channel) => channels.push(channel)); // add each channel name to the array

const channelembed = new MessageEmbed() // make the embed
  .setTitle("Channel List")
  .setDescription(channels.map((channel, index) => `${index + 1} - ${channel.name} (\`${channel.id}\`)`).join('\n')) // map the channel names to preferred format
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter({text: "Write the number of the channel"});
    message.channel.send({embeds: [channelembed]})
  }
}

  function chunkify(arr, len) {
  let chunks = [];
  let i = 0;
  let n = arr.length;

  while (i < n)
    chunks.push(arr.slice(i, (i += len)));

  return chunks;
}