const client = require("../../index");
const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");
const ms = require("ms");
const { developerID } = require("../../botconfig/main.json");
const { clientavatar } = require("../../botconfig/main.json");
const { clientname } = require("../../botconfig/main.json");
const prefix = 'v!';
const { randomMessages_Cooldown } = require("../../botconfig/main.json");
const premium = require("../../schemas/premium") 

const prettyMilliseconds = require('pretty-ms');
const cooldownSchema = require("../../schemas/cooldown")
let countingSchema = require('../../schemas/counting') 
client.on("messageCreate", async (message) => {
   if (
      message.author.bot ||
      !message.guild ||
      !message.content.toLowerCase().startsWith(prefix)
   )
      return;
   if (!message.member)
      message.member = await message.guild.fetchMember(message);
   const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");
   let noargs_embed = new MessageEmbed()
      .setTitle(`Please Provide A Command To Be Executed!`)
      .setColor("RED")
      .setFooter({text: `${clientname}`, iconURL: `${clientavatar}`})
      .setTimestamp();
   

   const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()))
   if (!command) return console.log(chalk.red(`no cmd ;-;`));
     
   if (command.toggleOff) {
      let toggleoff_embed = new MessageEmbed()
         .setTitle(
            `That Command Has Been Disabled By The Developers! Please Try Later.`
         )
         .setColor("RED")
         .setFooter({text: `${clientname}`, iconURL: `${clientavatar}`})
         .setTimestamp();
      return message.reply({ embeds: [toggleoff_embed] });
   } else if (!message.member.permissions.has(command.userpermissions || [])) {
      return message.reply({ content: `You Don't Have Permissions To Use The Command!` });
   } else if (!message.guild.me.permissions.has(command.botpermissions || [])) {
      return message.reply({ content: `I Don't Have Permissions To Use The Command!` });
   }  else if (command.developersOnly) {
      if (!developerID.includes(message.author.id)) {
         let developersOnly_embed = new MessageEmbed()
            .setDescription(
               `Only ${developerID.map((v) => `<@${v}>`).join(",")} can use the command!`
            )
            .setColor("RED")
            .setFooter({text: `${clientname}`, iconURL: `${clientavatar}`})
            .setTimestamp();
         return; /*message.reply({ embeds: [developersOnly_embed] });*/
      }
   } else if (command.timeout) {

      let cooldown;
      try {
        cooldown = await cooldownSchema.findOne({
          userID: message.author.id,
          commandName: command.name
        })
        if(!cooldown) {
          cooldown = await cooldownSchema.create({
            userID: message.author.id,
            commandName: command.name,
            cooldown: 0
          })
          cooldown.save()
        }
      } catch (e) {
        console.error(e)
      }

      if(!cooldown || command.timeout * 1000 - (Date.now() - cooldown.cooldown) > 0) {
      let timecommand = prettyMilliseconds(command.timeout * 1000, { verbose: true, verbose :true })

        const timeleft = prettyMilliseconds(command.timeout * 1000 - (Date.now() - cooldown.cooldown), {verbose:true})

        let cooldownMessage =  command.cooldownMsg ? command.cooldownMsg.description : `You're on a default cooldown of **${timecommand}**!\nTry again in **${timeleft}** `;

        let cooldownMsg = cooldownMessage.replace("[timeleft]", `${timeleft}`).replace("[cooldown]", `${timecommand}`).replace("[user]", `${message.author.username}`)

        let cTitle = ["Slow It Down! Spam isn't good...", "STOP SPAMMING!", "Hold your horses....", "Slow Down!"]

        let cooldownEmbed = new MessageEmbed()
        .setTitle(`${command.cooldownMsg ? command.cooldownMsg.title : cTitle[Math.floor(Math.random() * cTitle.length)]}`)
        .setDescription(cooldownMsg)
        .setColor(`${command.cooldownMsg ? command.cooldownMsg.color : "RED"}`)
        let cmesg = `<a:time:991829219883634758> | Try again in **${timeleft}**!`
        return message.reply({content: `${cmesg}`, allowedMentions: { "users" : [], "roles": [], repliedUser: false }}).then(msg => {
    setTimeout(() => {
  msg.delete()
}, 5000)    
  })
    } else {
      
      await cooldownSchema.findOneAndUpdate({
        userID: message.author.id,
        commandName: command.name
      }, {
        cooldown: Date.now()
      })
    }
      
   } 
   await command.run(client, message, args);
});
   
