'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model');
const users = require('./user.model');

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


let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
// let sequelize = new Sequelize(POSTGRES_URL);

let postModel = post(sequelize, DataTypes);
let commentModel = comment(sequelize, DataTypes);
let userModel = users(sequelize, DataTypes);

// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });


// Relations
postModel.hasMany(commentModel, {foreignKey: 'post_id', sourceKey: 'id'}); // sourceKey, targetKey = primary key
commentModel.belongsTo(postModel, {foreignKey: 'post_id', targetKey: 'id'});

userModel.hasMany(commentModel, {foreignKey: 'user_id', sourceKey: 'id'});
commentModel.belongsTo(userModel, {foreignKey: 'user_id', targetKey: 'id'});

userModel.hasMany(postModel, {foreignKey: 'user_id', sourceKey: 'id'});
postModel.belongsTo(userModel, {foreignKey: 'user_id', targetKey: 'id'});

commentModel.addHook('beforeCreate', async (comment) => {
  const user = await userModel.findOne({where : {id: comment.uesr_id}});
  comment.creator = user.username;
  // comment.name = comment.user.name;
});

// Collection
const postCollection = new Collection(postModel);
const commentCollection = new Collection(commentModel);
const userCollection = new Collection(userModel);


module.exports = {
  db: sequelize,
  Post: postCollection,
  postModel,
  Comment: commentCollection,
  commentModel,
  userModel,
  userCollection,
};


//---------------------------------------------
//POSTGRES_URL : postgresql://USERNAME:PASSWORD@HOST:PORT/DBNAME


//1. const users = require('./user.model')
//2. const userModel = users(sequelize, DataTypes);
//3. database.users = userModel;
// In one line:
// database.users = require('./user.model')(sequelize, DataTypes);
