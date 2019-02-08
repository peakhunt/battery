const mongojs = require('mongojs');
const logger = require('../logger');

const url = 'mongodb://localhost:27017/bms';
let db = null;

logger.info(`connecting to db ${url}`);
db = mongojs(url);

/* istanbul ignore next: */
db.on('error', (err) => {
  /* istanbul ignore next: */
  logger.error(`database error ${err}`);
  /* istanbul ignore next: */
  process.exit(-1);
});

/* istanbul ignore next: */
db.on('connect', () => {
  logger.info(`done connecting to db ${url}`);
});

function pingDB() {
  db.runCommand({ ping: 1 }, (err, res) => {
    /* istanbul ignore if  */
    /* istanbul ignore else */
    if (!err && res.ok) {
      /* istanbul ignore next: */
      logger.info('database is up');
    }
  });
}

module.exports = {
  pingDB
};
