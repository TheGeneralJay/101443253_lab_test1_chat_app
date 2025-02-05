const mongoose = require("mongoose");

const GroupMessageSchema = new mongoose.Schema({
  from_user: String,
  room: String,
  message: String,
  date_sent: Date,
});

const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;
