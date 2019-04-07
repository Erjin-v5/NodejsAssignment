require('dotenv').config();

const path = require('path');

module.exports = {
  development: {
    sitename: 'Rock, scissor, paper',
    data: {
      user: path.join(__dirname, '../data/profile.json'),
    },
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    sitename: 'Rock, scissor, paper',
    data: {
      user: path.join(__dirname, '../data/profile.json'),
    },
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
  test: {
    sitename: 'game [Test]',
    data: {
      user: path.join(__dirname, '../data/profile.json'),
    },
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};
