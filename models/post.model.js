'use strict';

// const Post = (define new table/schema)
const Post = (sequelize, DataTypes) =>
  sequelize.define('Post', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
  });

module.exports = Post;


// .define('table name', {table columns and their data types})
