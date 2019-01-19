const electron = require('electron');
const ipc = electron.ipcMain;

const { win } = require('./UI');
const { logic } = require('./logic');

ipc.on('minimize', () => win.minimize());
ipc.on('close', () => win.close());

ipc.on('devtools', () => win.webContents.openDevTools());

ipc.on('ipc-send', (_, obj) => {
  logic.emit('send', obj);
});

ipc.on('store-ready', ({ sender }) => {
  require('./store')(sender);
});
