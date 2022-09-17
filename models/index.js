'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');

const Collection = require('../collections/user-comment-routes');

// const POSTGRES_URL = process.env.HEROKU_POSTGRESQL_MAUVE_URL || 'postgresql://shaima:0000@localhost:5432/shaima';
const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL ; // npm i sqlite3

// ssl
const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

// let sequelizeOption = process.env.NODE_ENV === 'production' ? {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }
//   }
// } : {};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
// let sequelize = new Sequelize(POSTGRES_URL);
let postModel = post(sequelize, DataTypes);
let commentModel = comment(sequelize, DataTypes);

// Relations
postModel.hasMany(commentModel, {foreignKey: 'post_id', sourceKey: 'id'}); // sourceKey, targetKey = primary key
commentModel.belongsTo(postModel, {foreignKey: 'post_id', targetKey: 'id'});

// Collection
const postCollection = new Collection(postModel);
const commentCollection = new Collection(commentModel);


module.exports = {
  db: sequelize,
  Post: postCollection,
  Comment: commentCollection,
  commentModel: commentModel
};


//---------------------------------------------
//POSTGRES_URL : postgresql://USERNAME:PASSWORD@HOST:PORT/DBNAME
