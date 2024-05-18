const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'wordran',
  developersOnly: true,
  permissions: ['MANAGE_MESSAGES'], 
run: async (client, message, args) => {
  // /\b(\w{7,})+\b/g
  
    const wordList = client.config.wordlist
                var word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
                var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

  
  const maxWait = 15000;
  message.author.send(`The word is ${word}`)
  await message.channel.send(`**Event Started!**\nGuess the word \`${shuffled}\`!`);
  const filter = (response) =>
    numbers.includes(response.content.trim());

  const collector = message.channel.createMessageCollector(filter, {
    time: 15000,
  });
  collector.on('collect', (response) => {
    if(response.author.bot) return;
    var guessword = response.content.trim()
    if (guessword.toLowerCase() === word) {
      response.react('✅')
      response.reply(
        `${response.author} guessed it right! The word was \`${word}\`.`,
      );
      collector.stop();
    } else {

      if(response.author.bot) return;
      response.react('❌')
    }
  });
  collector.on('end', (collected, reason) => {
    if (reason === 'time') {
      message.channel.send("Time is up! Nobody was able to guess the word" + `\`${word}\`.`)
    }
    if(reason !== 'time') return;

    if(message.author.bot) return;
   /* if (collected.size > 0) {
      return message.channel.send(
        ` Out of ${collected.size} guess${
          collected.size > 1 ? 'es' : ''
        } nobody was able to guess the word \`${word}\`.`,
      );
    } */

    message.channel.send(
      `Event has ended`,
    );
  });
}
}