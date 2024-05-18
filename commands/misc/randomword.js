const {MessageEmbed} = require("discord.js")
  
module.exports = {
  name: "randomword",
  run: async (client, message, args) => {
    const wordList = client.config.wordlist
                var word = wordList[Math.floor(Math.random() * wordList.length)];
                var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

    let embed = new MessageEmbed()
    .setDescription(`**Random shuffled word:** \`${shuffled}\`\n**Word:** \`${word}\``)
    message.channel.send({embeds: [embed]})
  }
}