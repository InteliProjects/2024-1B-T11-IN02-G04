require('dotenv').config();
module.exports = {
  port: process.env.PORT || 1337,
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: process.env.DB_url,
    },
  },
  sockets: {
    onlyAllowOrigins: [
      "https://two024-1b-t11-in02-g04.onrender.com",
    ],
  },
  session: {
    cookie: {
      secure: true,
    }
  },
  http: {
    trustProxy: true,
  }
};