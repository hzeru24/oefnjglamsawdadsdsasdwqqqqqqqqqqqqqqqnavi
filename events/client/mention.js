
const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js") 
const config = require("../../botconfig/main") 
const client = require("../../index") 
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;


  // mentioned bot
  
   const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {

    let embed = new MessageEmbed()
        .setTitle(`Hi 👋 ${client.user.username} is Here!`)
        .setDescription(`
        My prefix is \`${config.prefix}\`\nType \`'help\` for the list of all available commands.`)
        .setThumbnail('https://media.discordapp.net/attachments/808699525085921321/940045730293350400/chibi_link.gif?width=597&height=597')
        .setColor("#ffdb58")
        .setFooter({text: `An ally of justice!`})
    const row2 = new MessageActionRow() 
  .addComponents(
     /* new MessageButton()
      .setLabel("Invite Me")
      .setStyle("LINK")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=924860342188773427&permissions=8&scope=bot%20applications.commands"), */
      new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL("https://top.gg/servers/821575403855544370/vote/")
  )

    let mesg = `Prefix is \`v!\``
      message.channel.send({content: `${mesg}` , components: [row2]})
    
      }

      })
