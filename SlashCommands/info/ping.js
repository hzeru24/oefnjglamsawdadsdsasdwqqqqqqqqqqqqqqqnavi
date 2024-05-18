const { Client, CommandInteraction } = require("discord.js");

module.exports = {
   name: "ping",
   description: "returns websocket ping",
   type: "CHAT_INPUT",
   run: async (client, interaction, args) => {
     await interaction.deferReply({ephemeral: true});
      interaction.followUp({ content: `${client.ws.ping}ms!`, ephemeral: true });
   },
};