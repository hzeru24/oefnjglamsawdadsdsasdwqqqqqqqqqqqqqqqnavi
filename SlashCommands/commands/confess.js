const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const conf = require('../../schemas/confessions')
const { prefix } = require('../../botconfig/main')
module.exports = {
  name: 'confess',
  description: 'Make a confession',
  options: [
    {
      type: "STRING",
      name: 'confession',
      description: 'Confess something',
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await interaction.deferReply({ ephemeral: true });

    const confession = args

    //  const confession = args.join(" ").split('confession:')[1].split('image:')[0].trim()
    //   const image = args.join(" ").split('image:')[1]

    const gData = await conf.findOne({ guild: interaction.guild.id });

    if (!gData) interaction.followUp({
      content: `Unable to send your confession! The confession channel hasn't been set up yet.\nRun \`${prefix}setconfessionchannel <channelid>\` to set up a confession channel.`,
      ephemeral: true,
    });

    try {

      //counts s  s  s s  s s s 
      let profile;
      try {
        profile = await conf.findOne({
          guild: interaction.guild.id,
        })
        if (!profile) {
          profile = await conf.create({
            guild: interaction.guild.id,
            times: 0,
          })
          profile.save()
        }
      } catch (e) {
        console.error(e)
      }

      let amount = 1


      //// wData
      const chan = interaction.client.channels.cache.get(gData.channel)

      const embed = new MessageEmbed()
        .setAuthor({ name: 'Anonymous confession ' + `#${profile.times + 1}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${confession}`)
        .setTimestamp()
        .setFooter({ text: 'Type "/confess" to send a confession' })
        .setColor('RANDOM')

      interaction.followUp('You\'ve successfully sent your confession!')
      chan.send({ embeds: [embed] })

      await conf.findOneAndUpdate({
        guild: interaction.guild.id
      }, {
        $inc: {
          times: amount
        }
      })

      //logggggsssssssss LOGS LOGS LOGS
      
      const dmlog = '974168500211953675'
      const conlog = new MessageEmbed()
      .setDescription(`${confession}`) 
      .setFooter(`From ${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL({dynamic: true}))
      .setAuthor(`Confession in ${interaction.guild.name}`, `${interaction.guild.iconURL({dynamic: true})}`)
      .setTimestamp()
      .setColor('#ffb5db')
      client.channels.cache.get(dmlog).send({embeds: [conlog]})
      

    } catch (err) {
      console.log(err);
    }
  },
};