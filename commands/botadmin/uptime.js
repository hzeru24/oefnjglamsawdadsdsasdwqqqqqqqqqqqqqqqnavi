const { MessageEmbed } = require("discord.js")
module.exports = {
  name: 'uptime',
  developersOnly: true,
  run: async (client, message, args) => {
    let msg = await message.channel.send(`Please wait...`);

      let date = new Date();
      let timestamp = date.getTime() - Math.floor(client.uptime);

    const em = new MessageEmbed()
    .setTitle(client.user.tag + " is online since:")
    .setDescription(`<t:${Math.floor(timestamp/1000)}:D>, <t:${Math.floor(timestamp/1000)}:R>`)

    setTimeout(() => {
        msg.edit({content: " ", embeds: [em] })
      }, 500)
    
  }
}