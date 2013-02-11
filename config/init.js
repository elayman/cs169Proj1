// //Create connection to database
// var pg = require('pg');

// // var qs = require('querystring');
// var client = new pg.Client(process.env.DATABASE_URL);
// client.connect();

// Add uncaught-exception handler in prod-like environments
if (geddy.config.environment != 'development') {
  process.addListener('uncaughtException', function (err) {
    var msg = err.message;
    if (err.stack) {
      msg += '\n' + err.stack;
    }
    if (!msg) {
      msg = JSON.stringify(err);
    }
    geddy.log.error(msg);
  });
}

