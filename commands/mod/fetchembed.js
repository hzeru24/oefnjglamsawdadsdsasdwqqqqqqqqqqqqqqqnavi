const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "copyembed",
  aliases: ["duplicate", "clone"],
  permissions: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {

    const messageId = args[0];

    try {
      const originalMessage = await message.channel.messages.fetch(messageId);
      if (!originalMessage) {
        return message.reply({ content: "Message not found.", repliedUser: false }).then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 10000);
        });
      }

      if (!originalMessage.embeds.length) {
        return message.reply({ content: "The original message does not have an embed.", repliedUser: false }).then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 10000);
        });
      }

      const embed = new MessageEmbed(originalMessage.embeds[0]);

      const embedJson = `\`\`\`${JSON.stringify(embed.toJSON(), null, 2)}\n\`\`\``;

      const reply = await message.channel.send({ embeds: [embed] });

      const deleteButton = new MessageButton()
        .setCustomId("delete_json")
        .setLabel("Delete JSON")
        .setStyle("DANGER");

      const buttonRow = new MessageActionRow().addComponents(deleteButton);

      const jsonMessage = await reply.channel.send({ content: `JSON source:\n${embedJson}`, components: [buttonRow] });

      const filter = (interaction) => interaction.customId === "delete_json" && interaction.user.id === message.author.id;
      const collector = jsonMessage.createMessageComponentCollector({ filter, time: 360000 });

      collector.on("collect", async (interaction) => {
        await jsonMessage.delete();
        interaction.deferUpdate();
      });

    } catch (error) {
      console.error(error);
      message.reply({ content: "An error occurred while duplicating the embed.", repliedUser: false }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    }
  }
};
