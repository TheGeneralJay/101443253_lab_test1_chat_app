const express = require("express");
const app = express();
const db = require("./db/dbConnection.js");
const socketio = require("socket.io");
const path = require("path");
const PORT = 3000;

db.mongoose.connect(db.uri);

const publicPath = path.join(__dirname, "..", "public");

app.use(express.json());
app.use(express.static(publicPath));

const server = app.listen(PORT, () => {
  console.log(`Chat server at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(`${publicPath}/pages/chat-app.html`);
});

// Create the socket server.
const io = socketio(server);

io.on("connection", (socket) => {
  // io = server.
  // socket = client.
  console.log(`New Client: ${socket.id}.`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}.`);
  });

  socket.on("message", (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
  });

  socket.on("privateMessage", (data) => {
    const storedMessage = new db.PrivateMessage(data);
    storedMessage.save();

    // Sends to the whole server.
    io.emit("privateMessage", data);
  });
});

// Paths.
const signupPath = "/api/signup";
const loginPath = "/api/login";

// Routes.
const signupRoutes = require("./routes/signupRoutes.js");
const loginRoutes = require("./routes/loginRoutes.js");

app.use(signupPath, signupRoutes);
app.use(loginPath, loginRoutes);
