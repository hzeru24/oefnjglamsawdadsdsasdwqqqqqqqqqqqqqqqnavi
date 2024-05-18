module.exports = {
  name: "findemoji", 
  aliases: ["findemote", "getemoji", "getemote"], 
  timeout: 2,
  run: async (client, message, args) => {
    let e = args;
    let fetche = client.emojis.cache.find(em => em.name.toLowerCase() === e.join(' ').toLocaleLowerCase())

//    let fetche = client.emojis.cache.find(em => em.includes(e)) 
    if(!fetche) return message.channel.send(`Unable to find that emoji name`)
    message.channel.send(`\`\<${fetche.animated ? 'a' : ''}:${fetche.name}:${fetche.id}>\``)
    message.react(`<${fetche.animated ? 'a' : ''}:${fetche.name}:${fetche.id}>`)
  }
}