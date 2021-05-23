/* eslint-disable no-plusplus */
const io = require('socket.io')();
const messageHandler = require('./handlers/message.handler');

let currentUserId = 2;
const users = {};

const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);

  return `https://placeimg.com/${rand1}/${rand2}/any`;
};

io.on('connection', (socket) => {
  users[socket.id] = { userId: currentUserId++ };

  socket.on('join', (username) => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();

    messageHandler.handleMessages(socket, users);
  });
});

io.listen(4567);
