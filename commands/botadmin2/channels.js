
module.exports = {
  name: 'channels',
  developersOnly: true,
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply('Please provide a server (guild) ID.');
    }

    const guildId = args[0];
    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
      return message.reply('Guild not found.');
    }

    const channelList = guild.channels.cache.map(channel => `${channel.type === 'GUILD_TEXT' ? 'Text' : 'Voice'}: ${channel.name} (ID: ${channel.id})`);

    message.channel.send(`Channel List for ${guild.name}:\n${channelList.join('\n')}`);
  }
};
