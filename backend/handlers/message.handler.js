/* eslint-disable no-plusplus */
let currentMessageId = 1;

const createMessage = (user, messageText) => ({
  _id: currentMessageId++,
  text: messageText,
  createdAt: new Date(),
  user: {
    _id: user.userId,
    name: user.username,
    avatar: user.avatar,
  },
});

const handleMessages = (socket, users) => {
  socket.on('message', (messageText) => {
    const user = users[socket.id];
    const message = createMessage(user, messageText);

    // diferente do io.emit, o socket.broadcast.emit não repassa a mensagem de volta
    // pra quem enviou a msg, somente para os demais
    socket.broadcast.emit('message', message);
  });
};

module.exports = { handleMessages };
