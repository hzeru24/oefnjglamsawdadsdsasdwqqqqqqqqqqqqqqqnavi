const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const client = require('../index')

const paginate = async (interaction, embeds) => {
  let currentPage = 0;
  
  let allbuttons = new MessageActionRow().addComponents([
    new MessageButton().setStyle("SECONDARY").setCustomId("0") //.setLabel("<<"),
     .setEmoji(`911282989676257361`),
    new MessageButton().setStyle("SECONDARY").setCustomId("1")
    //.setLabel("<"),
    .setEmoji(`911282961444392980`),
    new MessageButton().setStyle("DANGER").setCustomId("2")
    //.setLabel("⛔️"),
     .setEmoji(`<:trash:995906057647947776>`),
    new MessageButton().setStyle("SECONDARY").setCustomId("3")
    //.setLabel(">"),
     .setEmoji(`911283041031311360`),
    new MessageButton().setStyle("SECONDARY").setCustomId("4")
    //.setLabel(">>"),
     .setEmoji(`911283076506714112`),
  ]);
  if (embeds.length === 1) {
    if (interaction.deferred) {
      return interaction.followUp({
        embeds: [embeds[0]],
        fetchReply: true,
         allowedMentions: { "users" : [], "roles": []}
      });
    } else {
      return interaction.reply({
        embeds: [embeds[0]],
        fetchReply: true,
         allowedMentions: { "users" : [], "roles": []}
      });
    }
  }
  //Send message with buttons
  embeds = embeds.map((embed, index) => {
    return embed.setFooter({
      text: `Page ${index + 1} of ${embeds.length}`
    });
  });
  let swapmsg;
  if (interaction.deferred) {
    swapmsg = await interaction.followUp({
      embeds: [embeds[0]],
      components: [allbuttons],
       allowedMentions: { "users" : [], "roles": []}
    });
  } else {
    swapmsg = await interaction.reply({
      embeds: [embeds[0]],
      components: [allbuttons],
       allowedMentions: { "users" : [], "roles": []}
    });
  }
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({
    time: 2000 * 60,
  });
  collector.on("collect", async (b) => {
    if (b.isButton()) {
      await b.deferUpdate().catch((e) => {});
      // page first
      if (b.customId == "0") {
        if (currentPage !== 0) {
          currentPage = 0;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
               allowedMentions: { "users" : [], "roles": []}
            })
            .catch((e) => null);
        }
      }
      //page forward
      if (b.customId == "1") {
        if (currentPage !== 0) {
          currentPage -= 1;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
               allowedMentions: { "users" : [], "roles": []}
            })
            .catch((e) => null);
        } else {
          currentPage = embeds.length - 1;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
               allowedMentions: { "users" : [], "roles": []}
            })
            .catch((e) => null);
        }
      }
      //go home
      else if (b.customId == "2") {
        try {
          allbuttons.components.forEach((btn) => btn.setDisabled(true));
        /*  swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            }) 
            .catch((e) => null); */
          swapmsg.delete().catch((e) => null);
        } catch (e) {}
      }
      //go forward
      else if (b.customId == "3") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
               allowedMentions: { "users" : [], "roles": []}
            })
            .catch((e) => null);
        } else {
          currentPage = 0;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
               allowedMentions: { "users" : [], "roles": []}
            })
            .catch((e) => null);
        }
      }
      // page last
      if (b.customId == "4") {
        currentPage = embeds.length - 1;
        await swapmsg
          .edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
             allowedMentions: { "users" : [], "roles": []}
          })
          .catch((e) => null);
      }
    }
  });

  collector.on("end", () => {
    allbuttons.components.forEach((btn) => btn.setDisabled(true));
    swapmsg.edit({ components: [allbuttons] }).catch((e) => null);
  });
}

module.exports = paginate