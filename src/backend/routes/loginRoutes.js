const express = require("express");
const db = require("../db/dbConnection");
const path = require("path");
const router = express.Router();

// DB Connection.
db.mongoose.connect(db.uri);

// -----------------------------------------------
// *** LOGIN VIEW ***
// -----------------------------------------------
router.get("/", async (req, res) => {
  try {
    // Send user to signup.html.
    res.sendFile(path.join(__dirname, "../..", "public/pages", "login.html"));
  } catch (err) {
    res.status(400).send("ERROR: An unexpected error has occurred.");
    return;
  }
});

// -----------------------------------------------
// *** LOGIN ***
// -----------------------------------------------
router.post("/", async (req, res) => {
  const existingUser = req.body;
  // Find the user by the username.
  const dbUser = await db.User.findOne({ username: existingUser.username });

  try {
    // If user doesn't exist, notify user.
    if (!dbUser) {
      throw new Error();
    }
  } catch (err) {
    res
      .status(404)
      .send(
        `ERROR: Account with username '${existingUser.username}' does not exist.`
      );
    return;
  }

  // Now match the passwords.
  try {
    console.log(existingUser.password);
    if (existingUser.password === dbUser.password) {
      res.status(200).send(dbUser);
    } else {
      console.log("incorrect password");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR: Incorrect password.");
    return;
  }
});

module.exports = router;
