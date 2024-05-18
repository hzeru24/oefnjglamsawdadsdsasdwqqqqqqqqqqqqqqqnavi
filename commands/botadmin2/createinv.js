const { Permissions } = require('discord.js');
module.exports = {
  name: 'createinvite',
  developersOnly: true,
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply('Please provide a guild (server) ID or name.');
    }

    let guild;
    if (args[0].length === 18) {
      // Argument is a guild ID
      guild = client.guilds.cache.get(args[0]);
    } else {
      // Argument is a guild name
      guild = client.guilds.cache.find(g => g.name === args[0]);
    }

    if (!guild) {
      return message.reply('Guild not found.');
    }

    // Check if the bot has the necessary permissions to create an invite
    if (!guild.me.permissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE)) {
      return message.reply('I don\'t have the necessary permissions to create an invite in that guild.');
    }

    // Create an invite link for the general channel of the specified guild
    const channel = guild.channels.cache.find(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));
    if (!channel) {
      return message.reply('No accessible text channels in that guild.');
    }

    const invite = await channel.createInvite({
      unique: true,
      maxAge: 86400, // Invite link expires in 24 hours (in seconds)
      maxUses: 1,    // Invite link can only be used once
    });

    message.channel.send(`Invite link for ${guild.name}: ${invite.url}`);
  }
};
