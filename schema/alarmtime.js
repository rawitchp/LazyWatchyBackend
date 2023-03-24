const mongoose = require("mongoose");
const alarmSchema = new mongoose.Schema({
    time: String
  });
  
const Alarm = mongoose.model('Alarm', alarmSchema);
module.exports = Alarm;