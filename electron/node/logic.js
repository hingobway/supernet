const net = require('net');
const events = require('events');

const { socket } = require('./socket');

/**
 * Sets public vars. more info in ./socket.js (same concept there.)
 */
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

// Handle incoming messages/connections
server.on('connection', java => {
  exp.emit('ready');

  // Handle Incoming Messages
  java.on('data', d => {
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
  const sending = exp.on('send', obj => java.write(jtoa(obj)));

  java.on('close', () => exp.removeListener('send', sending));
});
