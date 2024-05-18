const { Client, Message, MessageEmbed } = require("discord.js");
let answers = [
  "noob123@gmail.com",
  "partyGirl53@gmail.com",
  "VerifiedEgirl@gmail.com",
  "ElonMusk411@gmail.com",
  "itsmymomsaccount@gmail.com",
  "GamerBoy0@gmail.com",
  "AwEsOmEPLAYER@gmail.com",
  "discord@gmail.com",
  "wang-pah69@gmail.com",
  "BananaGrow@gmail.com",
  "Tor0847362@gmail.com",
  "HeadCakeY9@gmail.com",
  "TickleKRAZY@gmail.com",
  "WALLPunch@gmail.com",
  "BoREdRaTaTaT@gmail.com",
  "hahaha@gmail.com",
  "yousuck69@gmail.com",
  "Froff1957@gmail.com",
  "jourrapide@gmail.com",
  "nirvaan.rustyn@gmail.com",

  "no gmail found ",
];
let passwords = [
  "1234",
  "69420",
  "OmGpass",
  "123StRoNgPaSsW0rD!",
  "#IamCool!!",
  "4536bu383f9",
  "B&bu85bU341111",
  "d@dwwwefubs1232",
  "eGirl@discord123",
  "765dWETmIeo",
  "Il134sleep",
  "noob",
  "ermsu7A",
  "password",
];
let ips = [
  "10.313.523.502.00.5",
  "85.583.123.742.09.1",
  "21.098.321.643.31.5",
  "69.420.420.420.69.0",
  "10.313.708.456.00.15",
  "10.875.620.754.00.32",
  "10.543.111.646.00.4",
  "10.113.843.524.00.98",
  "25.537.753.462.29.4",
  "21.175.866.974.07.08",
  "32.653.587.825.35.5",
  "12.172.764.781.22.8",
  "91.723.242.452.09.3",
  "92.743.116.896.85.6",
  "84.091.000.853.54.7",
  "51.071.124.129.12.0",
];
const { theme } = require('../../botconfig/main')

module.exports = {
  name: "hack",
  timeout: 15,
  description: "Remember, this is only a **JOKE** (maybe).",
  usage: "hack <user>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const answer = answers[Math.floor(Math.random() * answers.length)];
    const passwrd = passwords[Math.floor(Math.random() * passwords.length)];

    const ip = ips[Math.floor(Math.random() * ips.length)];

    function wait(ms) {
      let start = new Date().getTime();
      let end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    }
    const taggedUser = message.mentions.users.first();

    if (!taggedUser) {
      return message.channel.send("Tag the person who you want to hack!");
    }
    message.channel.send(`Hacking  ${taggedUser}...`);
    message.channel.send("Status: ■□□□□□□□□□□ 0%").then((msg) => {
      wait(200);
      msg.edit("Status: ■■□□□□□□□□□ 7%: Hacking Email...");
      wait(600);
      msg.edit(
        `Status: ■■■□□□□□□□□ 8%:\n \`Email: ${taggedUser}@yousuck.noob\`\n \`Password: ${passwrd}\` `
      );
      wait(600);
      msg.edit("Status: ■■□□□□□□□□□ 9%: Logging in to the Email...");
      wait(2000);
      msg.edit("Status: ■■■□□□□□□□□ 12%: Turning off the antivirus");
      wait(1000);
      msg.edit("Status: ■■■■□□□□□□□ 14%: Downloading Virus...");
      wait(100);
      msg.edit("Status: ■■■□□□□□□□□ 17%: Deleting Captcha...");
      wait(100);
      msg.edit("Status: ■■□□□□□□□□□ 20%: Deleting Paypal account...");
      wait(10);
      msg.edit("Status: ■■■□□□□□□□□ 21%");
      wait(12);
      msg.edit("Status: ■■■■□□□□□□□ 22%");
      wait(100);
      msg.edit("Status: ■■■■■□□□□□□ 24%: Paypal account deleted");
      wait(1000);
      msg.edit("Status: ■■■■□□□□□□□ 29%: Hacking is almost ready...");
      wait(80);
      msg.edit("Status: ■■■□□□□□□□□ 31%");
      wait(80);
      msg.edit("Status: ■■■■□□□□□□□ 36%");
      wait(40);
      msg.edit("Status: ■■■■■□□□□□□ 41%");
      wait(60);
      msg.edit("Status: ■■■■□□□□□□□ 47%");
      wait(50);
      msg.edit("Status: ■■■■■■□□□□□ 53%");
      wait(3000);
      msg.edit(
        `Status: ■■■■■■■□□□□ 58%: Email password changed so ${taggedUser} can not login`
      );
      wait(500);
      msg.edit("Status: ■■■■■■□□□□□ 66%");
      wait(60);
      msg.edit("Status: ■■■■■□□□□□□ 74%");
      wait(20);
      msg.edit(`Status: ■■■■■□□□□□□ 79%: IP address found: ${ip}`);
      wait(83);
      msg.edit("Status: ■■■■■■□□□□□ 80%");
      wait(50);
      msg.edit("Status: ■■■■■■■□□□□ 85%");
      wait(14);
      msg.edit("Status: ■■■■■■■■■□□ 93%");
      wait(70);
      msg.edit("Status: ■■■■■■■■■■□ 97%");
      wait(90);
      msg.edit("Status: ■■■■■■■■■■■ 100%").then(() => {
        const embed = new MessageEmbed()
          .setTitle("Hacking success!")
          .setDescription(`${taggedUser} has been hacked!`)
          .addField("INFO", "Information about the user that you hacked.")
          .addField("EMAIL", `${answer}`)
          .addField("PASSWORD", `${passwrd}`)
          .addField("IP address", `${ip}`)
          .setFooter({text: "Jk don't take it serious its just random generated strings!"})
          .setColor(`${theme}`);
          message.delete();
        message.channel.send({embeds: [embed]});
      });
    });
  } 
};
