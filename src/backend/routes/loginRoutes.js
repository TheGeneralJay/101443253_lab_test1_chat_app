const express = require("express");
const db = require("../db/dbConnection");
const router = express.Router();
const path = require("path");

// DB Connection.
db.mongoose.connect(db.uri);

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
      res.json(dbUser);
      const dir = path.join(__dirname, "../..", "public", "pages");
      res.sendFile(`${dir}/chat-app.html`);
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR: Incorrect password.");
    return;
  }
});

module.exports = router;
