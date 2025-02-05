const mongoose = require("mongoose");

const PrivateMessageSchema = new mongoose.Schema({
  from_user: String,
  to_user: String,
  room: String,
  message: String,
  date_sent: Date,
});

const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);
module.exports = PrivateMessage;
