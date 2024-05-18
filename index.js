//express
const express = require('express')
// import express
const app = express()
const chalk = require("chalk")

app.get('/', (req, res) => {
  res.send('Bot Loaded! Changes Saved!');
});

app.listen(3000, () => {
  console.log(
    chalk.white('['),
    chalk.cyan('Express'),
    chalk.white(']'),
    chalk.gray(':'),
    chalk.white('Connected')
  );
});


const {MessageEmbed} = require("discord.js") 


const { Client, Collection, Intents } = require("discord.js");
// Import Discord.Js.
//moongose in handler /index
const allIntents = new Intents(7796);
const client = new Client({
    intents: [32767, allIntents, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,32767, 7753, Intents.FLAGS.GUILD_VOICE_STATES], partials: ['CHANNEL'], 
ws: { properties: { $browser: "Discord iOS" } } });
module.exports = client;

const db = require("quick.db")
const countingSchema = require("./schemas/counting") 
let pagination = require('./function/pagination') 
const eco = require('./schemas/economy');
// ———————————————[Global Variables]———————————————
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
const Timeout = new Collection();
client.snipes = new Collection();
client.modals = new Collection();
client.config = require("./botconfig/main.json");
require("./handler")(client);



// ———————————————[Logging Into Client]———————————————
const token = process.env["clienttoken"] || client.config.clienttoken;
if(token === ""){
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Invalid Token")
   );
} else {
   client.login(token);
}
// Login The Bot.
// ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Unhandled Rejection/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Uncaught Exception/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.red.bold("AntiCrash"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Multiple Resolves")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(type, promise, reason);
});

const { mongooseConnectionString } = require("./botconfig/main.json");

// autokill
/*
  setInterval(() => {
    if(!client || !client.user) {
    console.log("Client Not Login, Process Kill")
        process.kill(1);
    app.get('/', (req, res) => {
  res.send('Bot Alive')
});
app.listen(2000, () => {
});

    }
}, 10000)  */
//////////////////////////////////////////////////////////////////
 
   setInterval(() => {
    if(!client || !client.user) {
    console.log("The Client Didn't Login Proccesing Kill 1")
        process.kill(1);
    } else return;
}, 10000); 
