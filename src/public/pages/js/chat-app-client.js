const ioClient = io();
// const db = require("../../../backend/db/dbConnection");

// db.mongoose.connect(db.uri);

ioClient.on("connect", () => {
  console.log(`Connected to the server.`);
});

ioClient.on("message", (data) => {});

ioClient.on("privateMessage", (data) => {
  const container = document.getElementById("container");
  const msg = `<p><b>${data.from_user}</b>: ${data.message}</p>`;

  container.innerHTML += msg;
});

const sendMsg = () => {
  const fromUser = document.getElementById("from_user");
  const toUser = document.getElementById("to_user");
  const msg = document.getElementById("message");

  const data = {
    from_user: fromUser.value,
    to_user: toUser.value,
    message: msg.value,
    date_sent: new Date(),
  };

  ioClient.emit("privateMessage", data);
};

ioClient.on("disconnect", function () {
  console.log(`Client disconnected.`);
});
