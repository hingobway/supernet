const { exec } = require('child_process');
const { promisify } = require('util');

const start = promisify(exec);

0;
(async () => {
  const { stderr, stdout } = await start('yarn java:compile');

  console.log(stderr, stdout);
})();
