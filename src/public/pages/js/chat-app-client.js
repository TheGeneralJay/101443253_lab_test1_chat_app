const ioClient = io();

ioClient.on("connect", () => {
  console.log(`Connected to the server.`);
});

ioClient.on("privateMessage", (data) => {
  const container = document.getElementById("container");
  const msg = `<p><b>${data.from_user}</b>: ${data.message}</p>`;

  container.innerHTML += msg;
});

ioClient.on("privateMessageHistory", (history) => {
  const container = document.getElementById("container");
  container.innerHTML = `<p>Chat History</p>`;

  history.forEach((msg) => {
    const fromUser = msg.from_user;
    const message = msg.message;
    const date = msg.date_sent;

    const historyMsg = `<p><b>${fromUser} (${date})</b>: ${message}</p>`;

    container.innerHTML += historyMsg;
  });
});

ioClient.on("groupMessageHistory", (history) => {
  const container = document.getElementById("container");
  container.innerHTML = `<p>Chat History</p>`;

  history.forEach((msg) => {
    const fromUser = msg.from_user;
    const message = msg.message;
    const date = msg.date_sent;

    const historyMsg = `<p><b>${fromUser} (${date})</b>: ${message}</p>`;

    container.innerHTML += historyMsg;
  });
});

ioClient.on("disconnect", function () {
  console.log(`Client disconnected.`);
});

// ----------------------------------------------
// *** HELPER FUNCTIONS ***
// ----------------------------------------------

const joinGroup = () => {
  const groupRadio = document.querySelector('input[name="group"]:checked');
  const groupName = groupRadio.value;

  ioClient.emit("joinGroup", groupName);
  console.log(`Joined ${groupName}!`);
};

const viewPrivateHistory = () => {
  ioClient.emit("privateMessageHistory", history);
};

const viewGroupHistory = () => {
  const groupRadio = document.querySelector('input[name="group"]:checked');
  const groupName = groupRadio.value;

  ioClient.emit("groupMessageHistory", groupName);
};

const sendGroupMsg = () => {
  const fromUser = document.getElementById("from_user");
  const roomRadio = document.querySelector('input[name="group"]:checked');
  const msg = document.getElementById("message");

  const data = {
    from_user: fromUser.value,
    room: roomRadio.value,
    message: msg.value,
    date_sent: new Date(),
  };

  ioClient.emit("groupMessage", data);
};

const sendPrivateMsg = () => {
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
