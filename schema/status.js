const mongoose = require("mongoose");
const StatusSchema = new mongoose.Schema({
    status_gun: Number,
    status_tun: Number,
    status_plus: Number
  });
  
  const Status = mongoose.model('status', StatusSchema);
module.exports = Status;