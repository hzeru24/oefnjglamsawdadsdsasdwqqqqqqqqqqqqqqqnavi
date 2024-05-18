const mongoose = require("mongoose")

const owsschema = mongoose.Schema({
  lastUser: {
    type: String,
    required: true
  },
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

module.exports = mongoose.model("owsdatabase", owsschema)