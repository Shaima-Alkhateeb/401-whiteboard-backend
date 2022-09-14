'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');

// const POSTGRES_URL = process.env.HEROKU_POSTGRESQL_MAUVE_URL || 'postgresql://shaima:0000@localhost:5432/shaima';
const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL; // npm i sqlite3

// // ssl
// const sequelizeOption = {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// };

// let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
let sequelize = new Sequelize(POSTGRES_URL);
// let sequelize = new Sequelize('shaima', 'shaima', '0000', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

module.exports = {
  db: sequelize,
  Post: post(sequelize, DataTypes)
};


//---------------------------------------------
//POSTGRES_URL : postgresql://USERNAME:PASSWORD@HOST:PORT/DBNAME