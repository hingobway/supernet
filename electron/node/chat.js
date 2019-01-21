const events = require('events');

const electron = require('electron');
const ipc = electron.ipcMain;

const { logic } = require('./logic');

/**
 * Handshake for communication from JAVA to frontend chat. More information on how this works in ./store.js.
 */
let send;
module.exports = sender => {
  send = (c, ...p) => sender.send('chat-' + c, ...p);
};

module.exports.chat = { send: (...p) => send(...p) };

ipc.on('chat-send-msg', (_, to, content) =>
  logic.emit('send', { method: 'send-msg', to, content })
);
