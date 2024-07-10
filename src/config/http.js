const cookieParser = require('cookie-parser');

module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'userAuth',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],

    userAuth: (req, res, next) => {
      if (req.cookies && req.cookies.username) {
        req.username = req.cookies.username;
      }
      return next();
    },
  },
};