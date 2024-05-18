const { Client, MessageButton, MessageActionRow } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'akinator',
    description: 'Play the Akinator game on Discord',
    aliases: ['aki'],
    category: 'fun',
    run: async (client, message, args) => {
        const baseUrl = 'https://api.affiliateplus.xyz/api';

        const startResponse = await fetch(`${baseUrl}/akinator`).then(response => response.json());

        const session = startResponse.session;
        const signature = startResponse.signature;

        let step = 0;

        const askQuestion = async () => {
            const questionResponse = await fetch(`${baseUrl}/akinator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session: session,
                    signature: signature,
                    step: step
                })
            }).then(response => response.json());

            const question = questionResponse.question;
            const answers = questionResponse.answers;

            const buttons = answers.map((answer, index) =>
                new MessageButton()
                    .setCustomId(`answer_${index}`)
                    .setLabel(answer)
                    .setStyle('PRIMARY')
            );

            const row = new MessageActionRow().addComponents(buttons);

            const response = await message.reply({
                content: question,
                components: [row]
            });

            const filter = (i) => i.customId.startsWith('answer_') && i.user.id === message.author.id;
            const collector = response.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (buttonInteraction) => {
                const answerIndex = parseInt(buttonInteraction.customId.split('_')[1]);
                step = answerIndex;

                if (questionResponse.end) {
                    await buttonInteraction.reply(`You were thinking of: **${questionResponse.name}**`);
                    collector.stop();
                } else {
                    for (const btn of row.components) {
                        btn.setDisabled(false);
                    }
                    buttonInteraction.update({ content: question, components: [row] });
                }
            });

            collector.on('end', async (_, reason) => {
                if (reason === 'time') {
                    await response.edit('Akinator session has timed out.');
                    for (const btn of row.components) {
                        btn.setDisabled(true);
                    }
                    response.edit({ components: [row] });
                }
            });
        };

        askQuestion();
    }
};
