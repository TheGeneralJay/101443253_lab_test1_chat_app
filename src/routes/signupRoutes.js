const express = require("express");
const db = require("../db/dbConnection.js");
const path = require("path");
const router = express.Router();

// DB Connection.
db.mongoose.connect(db.uri);

// -----------------------------------------------
// *** SIGNUP VIEW ***
// -----------------------------------------------
router.get("/", async (req, res) => {
  try {
    // Send user to signup.html.
    res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
  } catch (err) {
    res.status(400).send("ERROR: An unexpected error has occurred.");
    return;
  }
});

// -----------------------------------------------
// *** CREATE NEW USER / SIGNUP ***
// -----------------------------------------------
router.post("/", async (req, res) => {
  try {
    // Grab request body.
    const user = new db.User(req.body);

    // Save the user and send confirmation.
    await user.save();
    res.status(201).send("User successfully created.");
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR: An unexpected error has occurred.");
    return;
  }
});

module.exports = router;
