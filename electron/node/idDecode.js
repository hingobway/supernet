const dictionary = ['lo', 'no', 'la', 'di', 'su', 'do', 'fu', 'ba', 'mi', 'ti'];

const dtop = (exports.dtop = d => {
  let ok = true;
  let out = d
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
});

const ptod = (exports.ptod = p => {
  let ok = true;
  let out = p.split();
});
