const url = require('url');

const { app, BrowserWindow, Menu, Tray } = require('electron');

const win = (exports.win = new BrowserWindow({
  width: 1000,
  height: 600,
  minWidth: 992,
  minHeight: 600,
  frame: false,
  title: 'Supernet',
  icon: __dirname + '/../public/assets/img/logo_64x64.png'
}));

const eipc = require('./ElectronIPC');

const tray = (exports.tray = new Tray(
  __dirname + '/../public/assets/img/logo_32x32.png'
));
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Open Supernet',
    click: () => {
      win.show();
    }
  },
  { type: 'separator' },
  {
    label: 'Quit',
    click: () => {
      app.isQuitting = true;
      app.quit();
    }
  }
]);
tray.setToolTip('Supernet');
tray.setContextMenu(contextMenu);
tray.on('click', e => {
  win.show();
});

win.loadURL(
  process.env.BROWSE_START_URL ||
    url.format({
      pathname: __dirname + '/../build/index.html',
      protocol: 'file:',
      slashes: true
    })
);

win.on('close', e => {
  if (!app.isQuitting) {
    e.preventDefault();
    win.hide();
  }
});
