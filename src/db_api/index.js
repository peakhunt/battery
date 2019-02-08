const MongoClient = require('mongodb').MongoClient;
const logger = require('../logger');

const url = 'mongodb://localhost:27017/bms';
const dbName = 'bms';
const client = new MongoClient(url);

let db = null;

function pingDB() {
  /* istanbul ignore next: */
  db.command({ ping: 1 })
    .then(() => {
      /* istanbul ignore next: */
      logger.info('got ping response from mongodb');
    }, (err) => {
      /* istanbul ignore next: */
      logger.info(`database ping error ${err}`);
    });
}

/* istanbul ignore next: */
function init() {
  /* istanbul ignore next: */
  return new Promise((resolve, reject) => {
    logger.info(`trying to connect to ${url}`);
    /* istanbul ignore next: */
    client.connect((err) => {
      /* istanbul ignore next: */
      if (err) {
        logger.error(`failed to connect to ${url}`);
        return reject(err);
      }

      logger.info(`connected to db ${url}`);
      db = client.db(dbName);
      return resolve();
    });
  });
}

module.exports = {
  init,
  pingDB
};
