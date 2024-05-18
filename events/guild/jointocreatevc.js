const client = require('../../index')
const {Collection} = require('discord.js')
const voiceCollection = new Collection()
const db = require('../../schemas/vc')
let voiceManager = new Collection();

client.on("voiceStateUpdate", async (oS, nS) => {
  const { member, guild } = oS;
  const newChannel = nS.channel;
  const oldChannel = oS.channel;
  const JTC = "1040431043708211204";

  // if user join voice channel
  if (oldChannel !== newChannel && newChannel && newChannel.id === JTC) {
    const voiceChannel = await guild.channels.create(
      `${member.user.username}`,
      {
        type: "GUILD_VOICE",
        parent: newChannel.parent,
        permissionOverwrites: [
          {
            id: member.id,
            allow: ["CONNECT", "MANAGE_CHANNELS"],
          },
          {
            id: guild.id,
            allow: ["CONNECT"],
          },
        ],
      }
    );

    voiceManager.set(member.id, voiceChannel.id);
    // for spam protection
    await newChannel.permissionOverwrites.edit(member, { CONNECT: false });
    setTimeout(() => {
      newChannel.permissionOverwrites.delete(member);
    }, 30 * 1000);

    return setTimeout(() => {
      member.voice.setChannel(voiceChannel);
    }, 600);
  }

  // if user leave or switch
  const JTCCHANNEL = voiceManager.get(member.id);
  const members = oldChannel?.members
    .filter((m) => !m.user.bot)
    .map((m) => m.id);
  if (
    JTCCHANNEL &&
    oldChannel.id === JTCCHANNEL &&
    (!newChannel || newChannel.id !== JTCCHANNEL)
  ) {
    if (members.length > 0) {
      // code
      let randomID = members[Math.floor(Math.random() * members.length)];
      let randomMember = guild.members.cache.get(randomID);
      randomMember.voice.setChannel(oldChannel).then((v) => {
        oldChannel.setName(randomMember.user.username).catch((e) => null);
        oldChannel.permissionOverwrites.edit(randomMember, {
          CONNECT: true,
          MANAGE_CHANNELS: true,
        });
      });
      voiceManager.set(member.id, null);
      voiceManager.set(randomMember.id, oldChannel.id);
    } else {
      voiceManager.set(member.id, null);
      oldChannel.delete().catch((e) => null);
    }
  }
});