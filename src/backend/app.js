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
app.use(express.urlencoded());

const server = app.listen(PORT, () => {
  console.log(`Chat server at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(`${publicPath}/pages/chat-app.html`);
});

app.get("/view/login", (req, res) => {
  res.sendFile(`${publicPath}/pages/login.html`);
});

app.get("/view/signup", (req, res) => {
  res.sendFile(`${publicPath}/pages/signup.html`);
});

// Create the socket server.
const io = socketio(server);

io.on("connection", (socket) => {
  // io = server.
  // socket = client.
  console.log(`New Client: ${socket.id}.`);

  socket.on("joinGroup", (groupName) => {
    socket.join(groupName);
    console.log(`Joined ${groupName}!`);
  });

  // On connection, list the messages.
  socket.on("privateMessageHistory", async (data) => {
    // PRIVATE.
    const messageHistory = await db.PrivateMessage.find({});

    io.emit("privateMessageHistory", messageHistory);
  });

  socket.on("groupMessageHistory", async (data) => {
    // Find message history matching proper group name.
    const messageHistory = await db.GroupMessage.find({ room: data });

    io.emit("groupMessageHistory", messageHistory);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}.`);
  });

  socket.on("groupMessage", (data) => {
    const storedMessage = new db.GroupMessage(data);
    storedMessage.save();

    // Sends to the whole server.
    io.emit("groupMessage", data);
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
