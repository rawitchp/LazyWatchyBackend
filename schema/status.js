const mongoose = require("mongoose");
const StatusSchema = new mongoose.Schema({
    status_gun: String,
    status_plus: String,
    status_tun: String
  });
  
  const Status = mongoose.model('gun', StatusSchema);
module.exports = Status;