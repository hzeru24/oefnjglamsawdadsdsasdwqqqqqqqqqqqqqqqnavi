const { MessageEmbed } = require("discord.js");
const ownerid = ["845823982238564362"];
const ownerid2 = ["795217521136893983"];
const ownerid3 = ["470124502093922314"]

module.exports = {
    name: "leaveserver",
    aliases: [""],
    category: "owner",
  developersOnly: true,
    description: "Displays the list of servers the bot is in!",
  run: async (client, message, args) => {
    if (message.author.id == ownerid || ownerid2 || ownerid3) {
		
		    const guildId = args[0];
 
    if (!guildId) {
      return message.channel.send(`Please provide the server's ID for me to leave`);
    }
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      message.react("<:noo:938389111717376020>")
      return message.channel.send(`I'm not in that server`);
    }
 
    try {
      await guild.leave();
      return message.channel.send(`Successfully left **${guild.name}**`);
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that server!");
    }
    }
    }
  }