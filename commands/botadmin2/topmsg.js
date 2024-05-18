module.exports = {
  name: 'recentmessages',
  developersOnly: true,
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply('Please provide a channel ID.');
    }

    const channelId = args[0];
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      return message.reply('Channel not found.');
    }

    try {
      const messages = await channel.messages.fetch({ limit: 20 });

      let messageContent = '';

      for (const msg of messages) {
        const content = `**${msg[1].author.tag}:** ${msg[1].content}\n`;

        // Check if adding this message would exceed the message limit
        if (messageContent.length + content.length > 2000) {
          // If so, send the accumulated content and reset
          message.channel.send(messageContent);
          messageContent = content;
        } else {
          // If not, add the message content to the accumulated content
          messageContent += content;
        }
      }

      // Send any remaining accumulated content
      if (messageContent.length > 0) {
        message.channel.send(messageContent);
      }
    } catch (error) {
      console.error('Error fetching recent messages:', error);
      message.reply('An error occurred while fetching recent messages.');
    }
  }
};
