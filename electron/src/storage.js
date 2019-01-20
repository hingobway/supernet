const electron = window.require('electron');
const ipc = electron.ipcRenderer;

const storage = window.localStorage;

ipc.send('store-ready');

ipc.on('store-get', (e, request, key) => {
  ipc.send('store-get-cb', request, storage.getItem(key));
});

ipc.on('store-set', (e, request, key, value) => {
  storage.setItem(key, value);
  ipc.send('store-set-cb', request);
});
