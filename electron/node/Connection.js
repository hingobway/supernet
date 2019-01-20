const events = require('events');

const dictionary = ['lo', 'no', 'la', 'di', 'su', 'do', 'fu', 'ba', 'mi', 'ti'];
const ipPrefix = '192.168.';

class Connection extends events {
  constructor({ socket, id, ip }) {
    super();

    this.socket = socket;

    if (id) {
      this.id = id;
      this.ip = this.dtop(this.id);
    }
    if (ip) {
      this.ip = ip;
      this.id = this.ptod(this.ip);
    }
  }

  dtop(d) {
    let ok = true;
    let out =
      ipPrefix +
      d
        .slice(2)
        .split(' ')
        .map(cur =>
          cur
            .match(/[a-z]{2}/gi)
            .map(i => {
              const ind = dictionary.indexOf(i);
              if (ind > -1) return ind;
              // else:
              ok = false;
              return '';
            })
            .join('')
        )
        .join('.');
    return ok ? out : false;
  }

  ptod(p) {
    let ok = true;
    let out =
      '0.' +
      p
        .split('.')
        .slice(2)
        .map(cur =>
          cur
            .split('')
            .map(i => dictionary[parseInt(i)])
            .join('')
        )
        .join(' ');
    return ok ? out : false;
  }
}

module.exports = Connection;
