const net = require('net');
const events = require('events');

const exp = new events.EventEmitter();
module.exports = () => new Promise(r => exp.once('ready', r));

const PORT = 6473;

// Useful shortcut functions
const atoj = i => JSON.parse(i.toString());
const jtoa = i => JSON.stringify(i);

// Initialize socket
const server = net.createServer();
server.listen(PORT);
server.on('listening', () => exp.emit('ready'));

// Handle incoming messages/connections
server.on('connection', socket => {
  socket.on('data', d => {
    const resp = atoj(d);
    switch (resp.cmd) {
    }
  });
});
