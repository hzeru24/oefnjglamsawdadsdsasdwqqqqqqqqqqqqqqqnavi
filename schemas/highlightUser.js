const mongoose = require('mongoose');

const highlightUserSchema = new mongoose.Schema({
  userId: String,
  guildId: String,
  time: Number,
  highlightedUsers: [String]
});

module.exports = mongoose.model('HighlightUser', highlightUserSchema);
