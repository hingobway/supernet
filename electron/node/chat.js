const events = require('events');

const electron = require('electron');
const ipc = electron.ipcMain;

/**
 * Handshake for communication from JAVA to frontend chat. More information on how this works in ./store.js.
 */
let send;
module.exports = sender => {
  send = (c, ...p) => sender.send('chat-' + c, ...p);
};

const exp = (module.exports.chat = new events.EventEmitter());
exp.on('message', (method, ...p) => send(method, ...p));
