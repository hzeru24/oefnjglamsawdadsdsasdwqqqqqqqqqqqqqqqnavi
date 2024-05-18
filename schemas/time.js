const mongoose = require("mongoose")
const timezoneSchema = new mongoose.Schema({
  userId: String,
  timezone: String,
});

module.exports = mongoose.model('Timezone', timezoneSchema);