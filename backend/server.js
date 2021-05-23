/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
const io = require('socket.io')();
const { v4: uuidV4 } = require('uuid');

const users = {};

const getUsersOnline = () => {
  const usersList = Object.values(users);
  return usersList.filter((user) => user.username);
};

const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);

  return `https://placeimg.com/${rand1}/${rand2}/any`;
};

io.on('connection', (socket) => {
  users[socket.id] = { userId: uuidV4() };

  socket.on('disconnect', () => {
    console.log(users[socket.id].username, ' desconectou.');
    delete users[socket.id];
    io.emit('action', { type: 'users_online', payload: getUsersOnline() });
  });

  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/join':
        console.log('Got join event from: ', action.payload);
        users[socket.id].username = action.payload;
        users[socket.id].avatar = createUserAvatarUrl();
        io.emit('action', {
          type: 'users_online',
          payload: getUsersOnline(),
        });
        socket.emit('action', { type: 'self_user', payload: users[socket.id] });
        break;

      case 'server/private_message':
        const { conversationId } = action.payload;
        const from = users[socket.id].userId;
        const userValues = Object.values(users);
        const socketIds = Object.keys(users);

        for (let i = 0; i < userValues.length; i++) {
          if (userValues[i].userId === conversationId) {
            const socketId = socketIds[i];
            io.of(socketId).emit('action', {
              type: 'private_message',
              payload: {
                ...action.payload,
                conversationId: from,
              },
            });
            break;
          }
        }
        break;
    }
  });
});

io.listen(4567);
