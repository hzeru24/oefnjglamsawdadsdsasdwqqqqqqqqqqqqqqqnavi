const client = require("../../index");
const { MessageEmbed } = require("discord.js");
const trivia = require("../../json/triviass.json");

client.on("messageCreate", async (message) => {
  
  if (!message.guild) return;
  
  if(message.author.id === "929912006176309288") return;

  let ed;
  try {
  
    if(message.author.id === "270904126974590976") {
      if(message.guild.id === "821575403855544370") return;
      if (message.guild.id === "892176134794522684" || "927403952029437983") {

      ed = message.embeds[0].description.match(/(?<=\*{2}).*?(?=\*{2})/g);
      if(!ed) return;
    //"([^"]*)" ;; \*{2}(.*)\*{2}  /\*{2}([^\*{2}]*)\*{2}/g
    const an = trivia.find((obj) => obj.question === `${ed}`)
      if(an) {
    const ane = an.correct_answer
      if(!ane) return;
      
     const newEmbed = new MessageEmbed()
     .setTitle(`${ed}`)
     .setColor(message.embeds[0].color)
      
      message.reply({content: `**__Answer:__** ${ane}`, embeds: [newEmbed]}).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 10000)
      })
    } else if(!an) return;
    }
    } 
} catch (e) {
      return;
    }
})