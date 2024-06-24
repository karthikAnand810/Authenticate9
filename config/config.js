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
    database: 'spam_checker_db_test',
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres',
  },
  production: {
    database: 'spam_checker_db_prod',
    url: process.env.DATABASE_URL_PROD,
    dialect: 'postgres',
  },
};
