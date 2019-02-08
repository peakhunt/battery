const logger = require('../logger');

let db = null;

function pingDB() {
  /* istanbul ignore next: */
  db.command({ ping: 1})
    .then(result => {
      /* istanbul ignore next: */
      logger.info('database is up');
    }, err => {
      /* istanbul ignore next: */
      logger.info('database ping error');
    });
}

const apis = {
  pingDB
};

module.exports = (edb) => {
  db = edb;
  return apis;
}
