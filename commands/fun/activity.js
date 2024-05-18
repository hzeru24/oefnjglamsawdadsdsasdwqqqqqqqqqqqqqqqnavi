const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('axios')

module.exports = {
    name: 'vcg',
    aliases: ['vcgames'],
    userpermissions: ["ADMINISTRATOR"],
    description : "Do activities in discord.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const channel = message.member.voice.channel
        if(channel) {
          if(!args[0]) return message.reply({ embeds: [
            new MessageEmbed()
              .setTitle("Activity")
              .setDescription("Available game options:\n```\n・youtube-old\n・youtube-dev\n・youtube\n・chess\n・chess-dev\n・betrayal\n・fishing\n・poker\n・scrabble\n・sketchheads\n・checkers\n・wordsnacks```")
              .setColor('#87ceeb')
          ]});
          const query = args[0].toLowerCase();
          if(query === "youtube-old") {
            return ActivityFetch("755600276941176913", channel, "935719004297900083", "Youtube Together (old)", "RED", "Click the button below to watch Youtube Together (old) in vc", client, message);
          } else if(query === "youtube-dev") {
            return ActivityFetch("880218832743055411", channel, "935719004297900083", "Youtube Together (dev)", "RED", "Click the button below to watch Youtube Together (dev) in vc", client, message);
          } else if(query === "youtube") {
            return ActivityFetch("880218394199220334", channel, "935719004297900083", "Youtube Together", "RED", "Click the button below to watch Youtube Together in vc", client, message);
          } else if(query === "chess") {
            return ActivityFetch("832012774040141894", channel, "♟️", "Chess In The Park", "WHITE", "Click the button below to play Chess in the Park in vc", client, message);
          } else if(query === "chess-dev") {
            return ActivityFetch("832012586023256104", channel, "♟️", "Chess In The Park (dev)", "WHITE", "Click the button below to play Chess in the Park (dev) in vc", client, message);
          } else if(query === "betrayal") {
            return ActivityFetch("773336526917861400", channel, "🤫", "Betrayal.io", "BLUE", "Click the button below to play Betrayal in vc", client, message);
          } else if(query === "fishing") {
            return ActivityFetch("814288819477020702", channel, "🎣", "Fishington", "#55acee", "Click the button below to play Fishington in vc", client, message);
          } else if(query === "poker") {
            return ActivityFetch("755827207812677713", channel, "♠", "Poker Night", "WHITE", "Click the button below to play Poker Night in vc", client, message);
          } else if(query === "scrabble") {
            return ActivityFetch("879863686565621790", channel, "🧩", "Scrabble", "#a46df9", "Click the button below to play Letter League in vc", client, message);
          } else if(query === "wordsnacks") {
            return ActivityFetch("879863976006127627", channel, "😋", "Word Snacks", "#b9ffb7", "Click the button below to play Word Snacks in vc", client, message);
          }else if(query === "checkers") {
            return ActivityFetch("832013003968348200", channel, "♦", "Checkers", "#fdc25d", "Click the button below to play Checkers in vc", client, message);
          } else if(query === "sketchheads") {
            return ActivityFetch("902271654783242291", channel, "🖊️", "SketchHeads", "#fdc25d", "Click the button below to play Sketch Heads in vc", client, message);
          } else return message.reply({ embeds: [
            new MessageEmbed()
              .setTitle("Activity")
              .setDescription("Available game options:\n```\n・youtube-old\n・youtube-dev\n・youtube\n・chess\n・chess-dev\n・betrayal\n・fishing\n・poker\n・scrabble\n・sketchheads\n・checkers\n・wordsnacks```")
              .setColor('#87ceeb')
          ]});
        } else {
          return message.channel.send({ embeds: [
            new MessageEmbed()
                .setTitle("You must be connected to a voice channel to use this command!")
                .setColor('#87ceeb')
          ]});
        }
    },
};

async function ActivityFetch(code, channel, emoji, name, color, description, client, message) {
    fetch({
        method: "post",
        url: `https://discord.com/api/v8/channels/${channel.id}/invites`,
        data: {
            max_age: 86400,
            max_uses: 0,
            target_application_id: code,
            target_type: 2,
            temporary: false,
            validate: null
        },
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    }).then(invite => {
        if (!invite.data.code) return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setTitle("I was unable to start the Activity session!")
                .setColor('#87ceeb')
            ]
        });

        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle(name)
                .setDescription(description)
                .setColor('#87ceeb')
            ],
            components: [new MessageActionRow().addComponents(
                new MessageButton()
                .setStyle("LINK")
                .setLabel(name)
                .setEmoji(emoji)
                .setURL(`https://discord.com/invite/${invite.data.code}`)
            )]
        });
    });
}
