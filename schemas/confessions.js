const mongoose = require('mongoose')

const confessions = mongoose.Schema({

   guild: { type: String, required: true},
   channel: { type: String },
   times: { type: Number, default: 0 },

})

module.exports = mongoose.model('Confessions', confessions)  
