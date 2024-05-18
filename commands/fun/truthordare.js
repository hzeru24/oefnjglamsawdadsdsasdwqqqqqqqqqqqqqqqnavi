const { 
  Client, 
  Message,
  MessageEmbed, 
  MessageActionRow, 
  MessageButton, 
  } = require('discord.js');

module.exports = {
  name: "td",
  timeout: 5,
  aliases: ["tod", "truthordare"],
  permissions: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("truths")
      .setLabel("Truth")
      .setStyle("SUCCESS"),
      new MessageButton()
      .setCustomId("dares")
      .setLabel("Dare")
      .setStyle("DANGER")
    )
    const drow = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("truths")
      .setLabel("Truth")
      .setDisabled(true)
      .setStyle("SECONDARY"),
      new MessageButton()
      .setCustomId("dares")
      .setLabel("Dare")
      .setDisabled(true)
      .setStyle("SECONDARY")
    )

    let iuser = message.mentions.users.first() || message.author

    let embed = new MessageEmbed()
    .setTitle(`Truth or dare`)
    .setURL("https://www.youtube.com/watch?v=rzVhR7ioqL4")
    .setColor('#87ceeb')

    const m = await message.channel.send({ embeds: [embed], components: [row] })

    const filter = (interaction) => {
      if(interaction.user.id === iuser.id) return true;
      return interaction.reply({content: "This isn't for u", ephemeral: true})
    }

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
    });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate()

      if(interaction.customId === "truths") {
        let t = ["Are you gay?", "Tell me your age", "Do you like coffee?", "How tall are you?", "Do you miss your friends?", "On a scale of 10, how good looking are you?", "Would you rather stay at home or go outside?", "Do you have a crush?", "What do you think will happen to you in the next 10 years?", "Which grade are you in right now?", "Do you love working?", "Have you ever cried in front of other people?", "When was the last time you touched grass?", "What kind of person are you?", "Who is your crush?", "Are you homophobic?", "How often to you hang out with your parents?", "Do you have siblings?", "What is your ideal man/woman?", "Do you drink milk?", "If the world ends tomorrow, what will be the last thing you'll do?", "Is your handwriting good or bad?", "Do you have secrets?", "Have you ever fought against someone in your school?", "What are your plans in life?", "Are you religious?", "Would you engage yourself in online dating?", "Are you an introvert, ambivert, or extrovert?", "Do you believe that aliens exists?", "Where do you think people go after death?", "What time do you usually sleep?", "What is your favorite food?", "Do you like stargazing?", "When is your birthday?", "Have you ever gone outside the country?", "Do you live in the city or in the countryside?", "Do you know how to swim?", "What do you think of the *Earth is Flat* theory?", "Do you watch anime?", "Do you listen to korean music?", "What is/are your preference/s music?", "What is the title of your favorite book?", "Are you scared in horror films?", "Do you believe in ghosts?", "If only you and someone else are left in this world, who would be that *someone*?", "What is the title of your favorite song?", "What is your favorite band?", "Do you go to parties?", "What was the last movie you watched in a cinema?", "Who is your favorite artist?", "Do you drool when sleeping?", "When have you felt the most proud?", "Do you cook often?", "Who do you think is the best cook?", "What do you enjoy about being out in the nature?", "What hobbies are you interested in trying out?", "Do you play any sports?", "Who is the person you enjoy your time most when you're with them?", "You won $1 million, how will you spend the money?", "What is your dream job?", "What was your worst nightmare?", "When was the last time your parents saw you cry?", "What time do you usually take your breakfast?", "How many meals do you take in a day?", "How many people you ever dated?", "Hot or cold?", "Would you live in a tropical island or in snowy mountaintop?", "Do you find cockroaches disgusting?", "Ever stepped on a poop?", "How often do you miss classes?", "Are your grades high, average, or low?", "Do you have an imaginary friend when you were a kid?", "How many fingers do you have?", "Do you think you can count your hair strands in just a single day?", "Would you slap your bestfriend for $1,000?", "Does your mom still feeds you?"]

      let truthEmbed = new MessageEmbed()
    .setTitle(`${message.author.username} asks ${iuser.username}`)
    .setDescription(`${t[Math.floor(Math.random() * t.length)]}`)
    .setURL("https://www.youtube.com/watch?v=rzVhR7ioqL4")
    .setColor('#87ceeb')

     m.edit({  embeds: [truthEmbed], components: [drow] })
     } else if(interaction.customId === "dares") {
      let d = ["Do a flip", "Write your name on a piece of paper and send it here", "Say something funny in vc", "Send a picture of your pinky finger", "Give a deep explanation of one item in front of you", "Call someone and sing a song for them", "Call someone and say nothing", "Send a meme", "Record yourself singing a song and post it here", "DM your crush and ask them out on a date", "Put ice cubes down your pants and try to shake them out and send the video here", "Wait until a dog walks past your house and bark at it", "Walk to the nearest store and ask for the smallest available change for five dollars", "Tell your crush you like them", "Use a picture of your friend as your phone background for 24 hours", "Send the link of the most recent YouTube video you've seen", "Send the most unflattering picture of yourself here", "Tell all of the contents of your purse/wallet", "Send a break-up message to someone random in your contacts. Take a screenshot for proof", "Call your crush and flirt with them", "Call someone and say their name in a loud voice", "Call your mom and tell her you can’t find a boyfriend/girlfriend in a panicked voice", "Send the 11th picture in your photo gallery", "Send a picture of your first crush"]

      let dareEmbed = new MessageEmbed()
    .setTitle(`${message.author.username} dares ${iuser.username}`)
    .setDescription(`${d[Math.floor(Math.random() * d.length)]}`)
    .setURL("https://www.youtube.com/watch?v=rzVhR7ioqL4")
    .setColor('#87ceeb')

    m.edit({  embeds: [dareEmbed], components: [drow] })
      }
    })
  }
};
