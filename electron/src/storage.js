const electron = window.require('electron');
const ipc = electron.ipcRenderer;

const storage = window.localStorage;

ipc.send('store-ready');

ipc.on('store-get', (e, key, request) => {
  ipc.send('store-data', request, storage.getItem(key));
});
