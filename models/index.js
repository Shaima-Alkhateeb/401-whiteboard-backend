'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');

const POSTGRES_URL = process.env.HEROKU_POSTGRESQL_MAUVE_URL || process.env.DATABASE_URL;

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

module.exports = {
  db: sequelize,
  Post: post(sequelize, DataTypes)
};


//---------------------------------------------
//POSTGRES_URL : postgresql://USERNAME:PASSWORD@HOST:PORT/DBNAME