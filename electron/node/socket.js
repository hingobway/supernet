const net = require('net');
const events = require('events');

// const { logic } = require('./logic');
const { store } = require('./store');
const Connection = require('./Connection');
const { ptod, dtop } = new Connection({});

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

const peers = [];

// Initialize socket
const server = net.createServer();
server.listen(PORT);
server.on('listening', () => exp.emit('ready'));

// Socket Handler
const sockHandler = socket =>
  new Promise(cb => {
    // let ip = socket.address().address;
    // ip = ip.split(':');
    // ip = ip[ip.length - 1];
    let ip = socket.remoteAddress;

    // Creates conn, ref to the Connection object in peers array.
    const conn = peers[peers.push(new Connection({ socket, ip })) - 1];
    cb(conn);

    socket.on('data', d => {
      const data = atoj(d);
      require('./logic').logic.emit('send', data.sender.id, data);
    });
  });

// Responds to IPC-net-msg-send.
exp.on('send', async (recip, packet) => {
  const el = peers.findIndex(i => i.id === recip);
  // if peer already exists, send message and stop.
  if (el > -1) return peers[el].socket.write(jtoa(packet));
  // else:
  const { socket } = await sockHandler(net.createConnection(PORT, dtop(recip)));
  socket.once('connect', () => {
    console.log(packet);

    socket.write(jtoa(packet));
  });
});

// Handle incoming messages/connections
server.on('connection', sockHandler);
