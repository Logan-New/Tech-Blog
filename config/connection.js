const Sequelize = require('sequelize');
require('dotenv').config(); // Ensure environment variables are loaded

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? true : false, // Enable SSL in production
    },
    logging: false, // Disable logging for cleaner output
  }
);

module.exports = sequelize;
