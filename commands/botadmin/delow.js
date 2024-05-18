module.exports = {
  name: "delow",
  run: async(client, message, args) => {
    const ows = require("../../schemas/ows") 
    const chan = await ows.findOne({
    guild: message.guild.id
  })
    if(chan) {
      await ows.deleteOne({
    guild: message.guild.id
  })
    }
    
      message.react("✅")
      message.delete()
  }
}