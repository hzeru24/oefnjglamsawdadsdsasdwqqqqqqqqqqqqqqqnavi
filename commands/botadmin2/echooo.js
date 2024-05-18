const { WebhookClient } = require('discord.js');
module.exports = {
  name: 'sendmessage',
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply('Please provide a channel ID where you want to send the message.');
    }

    const channelId = args[0];
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      return message.reply('Channel not found.');
    }

    if (!args[1]) {
      return message.reply('Please provide a message to send.');
    }

    const content = args.slice(1).join(' ');

    try {
      // Create a webhook for the specified channel
      const webhook = await channel.createWebhook('Wednesday', {
        avatar: 'https://media.discordapp.net/attachments/996360167694282752/1152906090258894938/image.png?width=565&height=565'
      });

      // Send the message using the webhook
      await webhook.send(`*${content}*`);

      // Delete the temporary webhook
      await webhook.delete();

      message.reply('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message through webhook:', error);
      message.reply('An error occurred while sending the message.');
    }
  }
};
