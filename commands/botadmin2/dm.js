
module.exports = {
  name: 'senddm',
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply('Please provide a user ID.');
    }

    const userId = args[0];
    const user = await client.users.fetch(userId);

    if (!user) {
      return message.reply('User not found.');
    }

    if (!args[1]) {
      return message.reply('Please provide a message to send.');
    }

    const content = args.slice(1).join(' ');

    try {
      await user.send(`**${message.author.tag}**: ` + content);
      message.reply('Message sent to the user\'s DMs successfully!');
    } catch (error) {
      console.error('Error sending message to user\'s DMs:', error);
      message.reply('An error occurred while sending the message to the user\'s DMs.');
    }
  }
};
