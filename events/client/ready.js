const client = require("../../index");
const { prefix } = require('../../botconfig/main.json')

client.on("ready", () => {
  client.emit('tick')
  setInterval(() => {
    let pick = ['🍪', '🍩', '🍜', '🍕','🍺']; //"3", "420", "69", "🥑", "🍒", "💤", "🍣", "👀", "...", 
    client.user.setPresence({ activities: [{ name: `${pick[Math.floor(Math.random() * pick.length)]}`, type: `PLAYING` }] });
  }, 60000);
})