const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdon: { type: Date, default: new Date() },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
