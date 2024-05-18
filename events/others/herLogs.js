const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js") 
const config = require("../../botconfig/main") 
const client = require("../../index") 
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  if (message.author.id === "795615436855181353")  {

    const dmlogs = new MessageEmbed()
.setAuthor({name: message.author.tag, icon: message.author.displayAvatarURL({dynamic: true})})
.setTimestamp()
.setDescription(message.content)
.setColor('#fc8eac')
.setTitle(`**Click to Jump**`)
.setURL(message.url)
   /* client.users.cache.get('845823982238564362').send({embeds: [dmlogs]}) */
    client.users.cache.get('845823982238564362').send({content: "Ari is on!!!"}).then(msg => {
    setTimeout(() => {
  msg.delete()
}, 30000)    
  })
}

})