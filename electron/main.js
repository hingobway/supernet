const electron = require('electron');

const { app } = electron;

app.on('ready', () => require('./node/UI'));
