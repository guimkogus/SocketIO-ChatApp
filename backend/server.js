const io = require('socket.io')();

io.on('connection', () => {
  console.log('A user connected!');
});

io.listen(4567);
