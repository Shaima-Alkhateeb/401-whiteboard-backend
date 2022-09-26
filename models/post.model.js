'use strict';

// const Post = (define new table/schema)
const Post = (sequelize, DataTypes) =>
  sequelize.define('Post', {
    user_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    title: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
  });

module.exports = Post;


// .define('table name', {table columns and their data types})
