const wordnet = require('wordnet')
const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const paginate = require("../../function/pagination")

module.exports = {
  name: "testi",
  run: async (client,message,args) => {

      await wordnet.init();

  const words = await wordnet.list();

  const array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  
const embeds = [];
for (let i = 0; i < 5; i++) {
  const current = words.slice(0, 0 + 10)
  const embedd = new MessageEmbed().setDescription(await Promise.all(current.map(async () => ({array}))))
  
/*	const embed = new MessageEmbed().setFooter(`Page ${i + 1}`).setDescription(words.sort((a, b) => b.length - a.length).map(r => r).map((r, i) => `**${i + 1}** - ${r}`).slice(0, 2).join("\n"));
	embeds.push(embed); */
}
    
 paginate(message, embeds)
}
}