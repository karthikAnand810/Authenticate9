// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'spam_checker_db',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'spam_checker_db_test',
    DB_URL: process.env.DATABASE_URL_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'spam_checker_db_prod',
    DB_URL: process.env.DATABASE_URL_PROD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
