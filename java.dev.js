const { exec } = require('child_process');
const { promisify } = require('util');

const start = promisify(exec);

0;
(async () => {
  const proc = await start('yarn java:compile');
  //
})();
