const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger');

async function main() {
  const url = 'mongodb://localhost:27017/bms';
  const dbName = 'bms';
  const client = new MongoClient(url);
  let db = null; 

  logger.info(`trying to connect to ${url}`);
  try {
    // Use connect method to connect to the Server
    await client.connect();

    logger.info(`connected to db ${url}`);

    db = client.db(dbName);
  } catch (err) {
    /* istanbul ignore next: */
    logger.error(err);
  }
  // client.close();

  /* eslint-disable global-require */
  const db_api = require('./db_api')(db);
  const { app, listener } = require('./webif')();
  /* eslint-enable global-require */

  db_api.pingDB();

  logger.info('exprting...');
  return { server: app, listener };
}


//
// for unit test
//
module.exports = main();
