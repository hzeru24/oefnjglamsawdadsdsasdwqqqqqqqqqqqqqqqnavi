const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');

const client = require('../../index.js')

mongoose.connect(client.config.mongooseConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const raffleSchema = new mongoose.Schema({
  prize: String,
  participants: [{ userId: String, tickets: Number }]
});

const Raffle = mongoose.model('Raffle', raffleSchema);

const prefix = '!';

client.once('ready', () => {
  console.log('Bot is online');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member.permissions.has('ADMINISTRATOR')) return; // Only allow administrators to use the command

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'raffle') {
    if (args[0] === 'start') {
      const prize = args.slice(1).join(' ');

      const newRaffle = new Raffle({
        prize,
        participants: []
      });

      await newRaffle.save();

      const embed = new MessageEmbed()
        .setTitle('Raffle Started')
        .setDescription(`Prize: ${prize}\nReact with ✅ to enter the raffle!`);
      
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('enter_raffle')
            .setLabel('Enter Raffle')
            .setStyle('SUCCESS')
        );

      const sentEmbed = await message.channel.send({ embeds: [embed], components: [row] });

      const filter = (interaction) => interaction.customId === 'enter_raffle' && interaction.user.id !== client.user.id;
      const collector = sentEmbed.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (interaction) => {
        const raffle = await Raffle.findOne({ _id: newRaffle._id });

        if (!raffle.participants.some(p => p.userId === interaction.user.id)) {
          raffle.participants.push({ userId: interaction.user.id, tickets: 1 });
          await raffle.save();
          interaction.reply({ content: `You've entered the raffle!`, ephemeral: true });
        } else {
          interaction.reply({ content: `You're already in the raffle!`, ephemeral: true });
        }
      });

      collector.on('end', collected => {
        sentEmbed.edit({ components: [] });
      });
    }

    if (args[0] === 'end') {
      const raffle = await Raffle.findOne({}).sort({ _id: -1 }).limit(1);
      if (!raffle) return message.reply('No raffle found.');
      
      const winner = raffle.participants[Math.floor(Math.random() * raffle.participants.length)];

      const winnerEmbed = new MessageEmbed()
        .setTitle('Raffle Ended')
        .setDescription(`Congratulations to the winner: <@${winner.userId}>!\nPrize: ${raffle.prize}`);
      
      message.channel.send({ embeds: [winnerEmbed] });

      await raffle.remove();
    }
  }
});
