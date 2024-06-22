// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'spam_checker_db',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
    },
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
