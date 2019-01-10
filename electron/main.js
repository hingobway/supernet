const electron = require('electron');

const { app } = electron;

app.on('ready', async () => {
  console.log('Starting ICC server...');
  const socket = require('./node/socket');
  await socket();
  console.log('Done.');

  console.log('Starting IPC server...');
  const logic = require('./node/logic');
  await logic();
  console.log('Done.');

  console.log('Starting Electron...');
  require('./node/UI');
  console.log('Done.');
});
