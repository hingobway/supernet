const net = require('net');
const events = require('events');

/**
 * Set public vars.
 * - Initializes an event emitter for this class, which can be used to communicate between classes easily.
 * - Sets root export to a Promise, which will resolve once Java and Electron have connected. This means that Electron will not start until the full application is running.
 * - Exports the event emitter so that other classes can interact here.
 */
const exp = new events.EventEmitter();
module.exports = () => new Promise(r => exp.once('ready', r));
module.exports.socket = exp;

const PORT = 6473;

// Useful shortcut functions
const atoj = i => JSON.parse(i.toString());
const jtoa = i => JSON.stringify(i);

// Initialize socket
const server = net.createServer();
server.listen(PORT);
server.on('listening', () => exp.emit('ready', server.address()));

exp.on('ready', a => console.log(a));

// Handle incoming messages/connections
server.on('connection', socket => {
  socket.on('data', d => {
    const resp = atoj(d);
    switch (resp.cmd) {
    }
  });
});
