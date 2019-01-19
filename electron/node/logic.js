const net = require('net');
const events = require('events');

const { socket } = require('./socket');

const exp = new events.EventEmitter();
module.exports = () => new Promise(r => exp.once('ready', r));
module.exports.logic = exp;

const PORT = 6474;

// Useful shortcut functions
const atoj = i => JSON.parse(i.toString());
const jtoa = i => JSON.stringify(i);

// Initialize socket
const server = net.createServer();
server.listen(PORT);

// server.on('listening', () => exp.emit('ready'));

// Handle incoming messages/connections
server.on('connection', socket => {
  exp.emit('ready', socket.localAddress);

  // Handle Incoming Messages
  socket.on('data', d => {
    const resp = atoj(d);
    switch (resp.method) {
      case 'net-msg-send':
        if (resp.packet && resp.to) {
          socket.emit('send', resp.to, resp.packet);
        }
        break;
    }
  });

  // Send Messages from electron
  const sending = exp.on('send', obj => socket.write(jtoa(obj)));

  socket.on('close', () => exp.removeListener('send', sending));
});

exp.on('ready', a => console.log(a));
