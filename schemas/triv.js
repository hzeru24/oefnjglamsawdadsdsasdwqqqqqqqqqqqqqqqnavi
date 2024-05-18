const mongoose = require('mongoose')

const trivia = mongoose.Schema({

   guild: { type: String, required: true},
   channel: { type: String },

})

module.exports = mongoose.model('triviassss', trivia)  
