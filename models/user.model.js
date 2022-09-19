'use strict';

const User = (sequelize, DataTypes) =>
  sequelize.define('User', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, isEmail: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });

module.exports = User;
