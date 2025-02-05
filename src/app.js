const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const db = require("./db/dbConnection.js");

// Connection to the DB.
db.mongoose.connect(db.uri);

app.use(express.json());

// Add path to public folder for HTML pages.
const publicPath = path.join(__dirname, "public");

// Paths.
const signupPath = "/view/signup";
const loginPath = "/view/login";

// Routes.
const signupRoutes = require("./routes/signupRoutes.js");
const loginRoutes = require("./routes/loginRoutes.js");

app.use(signupPath, signupRoutes);
app.use(loginPath, loginRoutes);

app.get("/", async (req, res) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
