module.exports = {
  name: 'listusers',
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

    // Fetch all members of the guild
    await guild.members.fetch();

    const userList = guild.members.cache.map(member => `${member.user.tag} (ID: ${member.id})`);

    message.channel.send(`User List for ${guild.name}:\n${userList.join('\n')}`);
  }
};
