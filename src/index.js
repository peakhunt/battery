const db_api = require('./db_api');
const web_if = require('./webif');

function main() {
  return new Promise((resolve, reject) => {
    /* istanbul ignore next: */
    db_api.init().then(() => {
      /* istanbul ignore next: */
      db_api.pingDB(); /* just test */
      const { app, listener } = web_if();
      return resolve({ server: app, listener });
    }, (err) => {
      /* istanbul ignore next: */
      process.exit(-1);
      return reject(err);
    });
  });
}


//
// for unit test
//
module.exports = main();
