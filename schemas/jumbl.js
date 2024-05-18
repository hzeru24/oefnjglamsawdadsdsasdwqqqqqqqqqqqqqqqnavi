const mongoose = require('mongoose');

const jumbleWordSchema = new mongoose.Schema({
    guildId: String,
    channelId: String
});

const JumbleWord = mongoose.model('JumbleWord', jumbleWordSchema);

module.exports = JumbleWord;