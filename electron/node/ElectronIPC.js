const electron = require('electron');
const ipc = electron.ipcMain;

const { win } = require('./UI');
const { logic } = require('./logic');
const { socket } = require('./socket');

const Connection = require('./Connection');
const { ptod, dtop } = new Connection({});

ipc.on('devtools', () => win.webContents.openDevTools());
ipc.on('minimize', () => win.minimize());
ipc.on('close', () => win.close());

ipc.on('store-ready', ({ sender }) => {
  require('./store')(sender);
});
ipc.on('chat-ready', ({ sender }) => {
  require('./chat')(sender);
});

ipc.on('ipc-send', (_, obj) => {
  logic.emit('send', obj);
});
ipc.on('ptod', (e, p) => (e.returnValue = ptod(p)));
ipc.on('dtop', (e, d) => (e.returnValue = dtop(d)));
