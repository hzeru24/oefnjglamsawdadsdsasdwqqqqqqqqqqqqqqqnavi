const {MessageActionRow, MessageButton, MessageEmbed, Collection} = require("discord.js") 
const config = require("../../botconfig/main") 
const client = require("../../index") 

client.modmailThreads = new Collection(); 

client.on("messageCreate", async (message) => {
   if (message.author.bot || message.guild)return;

  
   const prefix = "!";
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  

if(!message.guild) {
  if(message.author.id !== "845823982238564362") {
  if(!message.content.startsWith("!message")) {
      message.author.send('Type `!message <message>` to leave a message')
  }
  if(cmd === "message") {

  const embed = new MessageEmbed()
    .setTitle(message.author.username + ` has DM'd!`)
    .setDescription(`${message.content}`)
    .setTimestamp()
    .setColor(`#36393F`)
    .setFooter({text: `!reply ${message.author.id}`})
  const mesg = `__**You have a message from ${message.author.tag}**__\n${args.slice(0).join(" ")}\n\n\`!reply ${message.author.id}\``

  client.users.cache.get('845823982238564362').send({content: mesg})
    message.react('✅')
  }
}

  ///////////////////////////////////////////////////////////////
  if(message.author.id === "845823982238564362") {
    if(!message.content || !message.content.includes("!reply")) {
      message.author.send('Type `!reply <userID> <message>` to reply on a DM')
    }

  if(cmd === "reply") {
    const user = `${args[0]}`
    client.users.cache.get(user).send(`${args.slice(1).join(" ")}`)
    message.react('✅')
  }
}
}

  }
);