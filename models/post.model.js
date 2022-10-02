'use strict';

const Post = (sequelize, DataTypes) =>
  sequelize.define('Post', {
    // user_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'title'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'description'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

module.exports = Post;


// .define('table name', {table columns and their data types})
