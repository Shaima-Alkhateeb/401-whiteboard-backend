'use strict';

const Comment = (sequelize, DataTypes) => sequelize.define('Comment', {
  comment: { type: DataTypes.STRING, defaultValue: 'Hello World' },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, defaultValue: 'Shaima' },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Comment;
