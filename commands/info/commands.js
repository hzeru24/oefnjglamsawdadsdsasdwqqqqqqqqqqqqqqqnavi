const paginate = require("../../function/pagination")
const { MessageEmbed } = require("discord.js")
const { blank } = require("../../botconfig/main.json")

module.exports = {
  name: "commands",
  aliases: ['cmd'],
  timeout: 30,
  permissions: ["SEND_MESSAGES"],
  description: "View list of all commands",
  run: async(client, message, args) => {
    const e1 = new MessageEmbed() 
  .setAuthor({name: `${client.user.username}` + "'s Commands Panel", iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
  .setDescription(`🛠️ __**Admin:**__\n- \`role\`\n😝 __**Fun:**__\n- \`emojify\`, \`rate\`, \`reverse\`, \`truthordare\`\n⚙️ __**Config:**__\n-\`setonewordstory\`, \`setconfessionchannel\`\n🖼️ __**Images:**__\n- \`animals\`\nℹ️ __**Info:**__\n- \`commands\`\n💫 __**Others:**__\n- \`duplicate\`, \`ghostping\`, \`highlight\`, \`listemoji\`, \`time\`, \`tts\`\n🗑️ __**Slash Commands:**__\n</autocomplete:1052327696773951562>, </confess:1052327696773951559>, </firstletter:1052327696773951560>, </jumbleword:1068867416169386005>, </longwords:1052327696773951561>, </ping:981461078133325864>`)
    .setColor(`${blank}`)

  const embeds = [e1]

  await paginate(message, embeds)
  }
}