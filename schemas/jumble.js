const mongoose = require("mongoose")

const jumble = mongoose.Schema({
  lastWord: String,
  channel: {
    type: String,
    required: true
  },
  guild: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("jwDB", jumble)