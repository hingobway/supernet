const connection = require('./Connection');

const n = new connection({ id: '0.bado ladino' });

console.log(n.id, n.ip);

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function(ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function(iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) return;

    if (alias == 0) console.log(ifname, iface.address);
    ++alias;
  });
});
