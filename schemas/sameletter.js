const mongoose = require("mongoose")

const sameletter = mongoose.Schema({
    channelId: {
        type: String,
        required: true
    },
    userId: {
      type: String,
      required: true
    },
    guildId: {
        type: String,
        required: true
    }, 
    able: {
        type: Boolean,
        default: false,
    },
    time: {
      type: String,
      required: true
    }, 
    score: {
      type: Integer,
      default: 0
    }
})

module.exports = mongoose.model("sameletter", sameletter)