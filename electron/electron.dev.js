const net = require('net');
const { spawn } = require('child_process');

const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.COOLBOT_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let started = false;
const Try = () =>
  client.connect(
    { port },
    () => {
      client.end();
      if (!started) {
        console.log('starting electron');
        started = true;
        const proc = spawn('yarn', ['electron:start'], { shell: true });
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
      }
    }
  );

Try();

client.on('error', () => {
  setTimeout(Try, 1000);
});
