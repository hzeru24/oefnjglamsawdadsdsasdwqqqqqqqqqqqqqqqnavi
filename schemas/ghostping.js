const mongoose = require("mongoose")

const ghostping = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    Ping: {
        type: Boolean,
        default: false,
    },
    AFK_Reason: {
        type: String,
        default: null
    },
    time: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model("ghostping", ghostping)