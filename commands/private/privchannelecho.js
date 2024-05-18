module.exports = {
  name: "aecho",
  timeout: 5,
  description: "Send message to a random server's channel",
  developersOnly: true,
  run: async (client, message, args) => {
    const channel = args[0]
    const msg = args.join(' ').split(channel)[1];
    message.delete()
    client.channels.cache.get(channel).send({content: `${msg}`, allowedMentions: { "users" : [], "roles": []}})
    console.log(`Sent "${msg}" in ${channel.name}!`)
  }
}