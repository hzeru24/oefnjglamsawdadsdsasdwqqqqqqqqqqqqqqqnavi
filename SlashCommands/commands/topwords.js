const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { words } = require('../../schemas/dictionary2.json');
//const wordnet = require('wordnet');

module.exports = {
  name: 'longwords',
  description: 'Search for top long words',
  options: [
    {
      type: "STRING",
      name: 'query',
      description: 'Search for top long words (autocomplete)',
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const ar = interaction.options.getString('query');
    const wordss = words.filter(m => /^\w+$/.test(m) && m.includes(ar));

    if (!wordss.length) {
      await interaction.reply({ content: `Unable to find a word for ${ar}`, ephemeral: true });
      return;
    }

    let i0 = 0;
    let i1 = 20;
    let page = 1;

    let description =
      wordss.sort((a, b) => b.length - a.length)
        .slice(i0, i1)
        .join("\n");

    const backButton = new MessageButton()
      .setCustomId('back')
      .setStyle('SECONDARY')
      .setLabel('Back')
      .setEmoji('⬅');

    const forwardButton = new MessageButton()
      .setCustomId('forward')
      .setStyle('SECONDARY')
      .setLabel('Next')
      .setEmoji('➡');

    const buttonRow = new MessageActionRow()
      .addComponents(backButton, forwardButton);

    const embed = new MessageEmbed()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTitle(`${wordss.length} words found`)
      .setColor('#000000')
      .setFooter(`/longwords <query>`)
      .setDescription(description);

    const msg = await interaction.reply({ embeds: [embed], components: [buttonRow], ephemeral: true });

    const channelId = interaction.channelId;
    const channel = await client.channels.fetch(channelId);
    const collector = channel.createMessageComponentCollector({ filter: ({ user }) => user.id === interaction.user.id });

    collector.on("collect", async (button) => {
      if (button.customId === 'back') {
        i0 -= 20;
        i1 -= 20;
        page--;

        if (i0 < 0) {
          return button.deferUpdate();
        }
      } else if (button.customId === 'forward') {
        i0 += 20;
        i1 += 20;
        page++;

        if (i1 > wordss.length) {
          return button.deferUpdate();
        }
      }

      description =
        wordss.sort((a, b) => b.length - a.length)
          .slice(i0, i1)
          .join("\n");

      embed.setDescription(description);
      await button.update({ embeds: [embed] });
    });

    const chan = interaction.client.channels.cache.get("1085122375265292340")
    chan.send({ content: "<:w_dot:1047104723758624810>  " + `\`${interaction.user.tag}\` used </longwords:1052327696773951561> in **${interaction.guild.name}**` });
  }
};
