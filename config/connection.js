const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  "wishlist_db",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;