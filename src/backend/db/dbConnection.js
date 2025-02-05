const mongoose = require("mongoose");
const User = require("../models/User");
const GroupMessage = require("../models/GroupMessage");
const PrivateMessage = require("../models/PrivateMessage");
const uri = "mongodb+srv://admin:adminpassword@chat-app.8usha.mongodb.net/";

module.exports = {
  mongoose,
  uri,
  User,
  GroupMessage,
  PrivateMessage,
};
