const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true, // This ensures that SSL is used
      rejectUnauthorized: false // Adjust based on your security needs
    }
  },
  logging: false // Disable logging if desired
});

module.exports = sequelize;
