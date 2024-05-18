module.exports = {
    name: 'listemoji',
    timeout: 10,
    usage: 'View server emotes',
    permissions: ["MANAGE_SERVER"],
  
  run: async ( client, message, args ) => {
  //  let { guild } = message;
//    let pageNum = args[0] || 1;
    const guildId = args[0] || message.guild.id
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      message.react("<:noo:938389111717376020>")
      return message.channel.send(`I'm not in that server`);
    }

    const emotes = guild.emojis.cache.map(
      (e) => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}> \`:${e.name}:\``,
    );

    var page = parseInt(emotes);

    if (!page) {
        page = 1;
    };

    //Send the message in a way that lets us edit it later
    const listMsg = await message.channel.send("...");

    //React in order
    await listMsg.react("◀️");
    await listMsg.react("▶️");

    const filter = (reaction, user) => ["◀️", "▶️"].includes(reaction.emoji.name) && user.id === msg.author.id;

    const collector = listMsg.createReactionCollector(filter, {
        time: 120000
    });

    collector.on('collect', (reaction, user) => {

        switch (reaction.emoji.name) {
            case "◀️":
                //Decrement the page number
                --page;

                //Make sure we don't go back too far
                if (page < 1) {
                    page = 1;
                };

                listMsg.edit(getEmotes(page));

                break;

            case "▶️":
                //Increment the page number
                ++page;

                listMsg.edit(getEmotes(page));

                break;
        };
    });

    collector.on('end', collected => {
        return message.channel.send("...");
    });

    function getEmotes(n) {
        const list = guild.emojis.cache.map(
      (e) => `<${e.animated ? 'a' : ''}:${e.name}:${e.id}> \`:${e.name}:\``,
    );

        //Take the page from the function params
        var pageNum = (n * 10) //- 10;

        if (!pageNum) {
            pageNum = 0;
        };

        return list.slice(pageNum, pageNum + 20).join(`\n`);
    }
  },
  
  }