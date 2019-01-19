const uuid = require('uuid');

const electron = require('electron');
const ipc = electron.ipcMain;

let send;
module.exports = async sender => {
  send = (c, ...p) => sender.send('store-' + c, ...p);

  let u = await get('username');
  console.log(u);
};

const get = (exports.get = key =>
  new Promise(cb => {
    const id = uuid();
    send('get', key, id);
    async function wait(r) {
      ipc.on('store-data', (_, req, data) => {
        if (req == id) {
          r(data);
        } else return wait(r);
      });
    }
    wait(cb);
  }));
