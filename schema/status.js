const mongoose = require("mongoose");
const StatusSchema = new mongoose.Schema({
    status_gun: String,
    status_tun: String,
    status_plus: String
  });
  
  const Status = mongoose.model('status', StatusSchema);
module.exports = Status;