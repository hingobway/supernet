const uuid = require('uuid');

const electron = require('electron');
const ipc = electron.ipcMain;

/**
 * INIT code. Will be initialized in app start once persistent storage is ready in webContents.
 */
let send;
module.exports = async sender => {
  send = (c, ...p) => sender.send('store-' + c, ...p);
};

/**
 * Wait function will fake an async/await flow using the events API by recursively listening for a callback event with the request ID that was sent.
 */
function wait(method, id, cb) {
  ipc.once(`store-${method}-cb`, (_, req, ...params) => {
    if (req == id) {
      cb(...params);
    } else wait(cb);
  });
}

/**
 * The Persistent Storage API.
 *
 * Initialized at start, uses IPC and the webContents storage API to persist data. Has 2 very simple functions, both asynchronous:
 * - get(key): get a value. Returns: value.
 * - set(key,value): store something new. Returns: nothing.
 */
module.exports.store = {
  get: key =>
    new Promise(cb => {
      const id = uuid();
      send('get', id, key);
      wait('get', id, cb);
    }),
  set: (key, value) =>
    new Promise(cb => {
      const id = uuid();
      send('set', id, key, value);
      async function wait(r) {
        ipc.once('store-set-cb', (_, req) => {
          if (req == id) {
            r();
          } else return wait(r);
        });
      }
      wait(cb);
    })
};
