const ioClient = io();

ioClient.on("connect", () => {
  console.log(`Connected to the server.`);
  const userHeader = document.getElementById("user-header");
  const username = localStorage.getItem("username");

  userHeader.innerHTML = `User: ${username}`;
});

ioClient.on("privateMessage", (data) => {
  const container = document.getElementById("container");
  const date = data.date_sent;
  const msg = `<p><b>${data.from_user} (${date})</b>: ${data.message}</p>`;

  container.innerHTML += msg;
});

ioClient.on("groupMessage", (data) => {
  const container = document.getElementById("container");
  const date = data.date_sent;
  const msg = `<p><b>${data.from_user} (${date})</b>: ${data.message}</p>`;

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
  const currentGroupHeader = document.getElementById("current-group");
  const fromUser = localStorage.getItem("username");
  const sendPrv = document.getElementById("send-prv");
  const sendGrp = document.getElementById("send-grp");

  const msgContainer = document.getElementById("msg-container");
  const toUser = document.getElementById("to_user");

  msgContainer.removeAttribute("hidden");

  currentGroupHeader.innerHTML = `Current Group: ${groupName}`;

  if (groupName == "Private Message") {
    toUser.hidden = false;
    sendPrv.hidden = false;
    sendGrp.hidden = true;

    ioClient.emit("joinGroup", groupName);
    ioClient.emit("privateMessageHistory", fromUser);
  } else {
    sendGrp.hidden = false;
    toUser.hidden = true;
    sendPrv.hidden = true;

    ioClient.emit("joinGroup", groupName);
    ioClient.emit("groupMessageHistory", groupName);
  }

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
  const fromUser = localStorage.getItem("username");
  const roomRadio = document.querySelector('input[name="group"]:checked');
  const msg = document.getElementById("message");

  const data = {
    from_user: fromUser,
    room: roomRadio.value,
    message: msg.value,
    date_sent: new Date(),
  };

  ioClient.emit("groupMessage", data);

  msg.value = "";
};

const sendPrivateMsg = () => {
  const fromUser = localStorage.getItem("username");
  const toUser = document.getElementById("to_user");
  const msg = document.getElementById("message");

  const data = {
    from_user: fromUser,
    to_user: toUser.value,
    message: msg.value,
    date_sent: new Date(),
  };

  ioClient.emit("privateMessage", data);
};
