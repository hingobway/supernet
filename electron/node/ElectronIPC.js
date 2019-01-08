const electron = require('electron');
const ipc = electron.ipcMain;

const { win } = require('./UI');

ipc.on('minimize', () => win.minimize());
ipc.on('close', () => win.close());
