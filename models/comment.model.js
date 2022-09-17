'use strict';

const Comment = (sequelize, DataTypes) => sequelize.define('Comment', {
  comment: { type: DataTypes.STRING, allowNull: false },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, defaultValue: 'Shaima' }
});

module.exports = Comment;
