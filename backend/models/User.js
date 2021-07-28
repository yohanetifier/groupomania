const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('groupomania', 'root', 'Eti&300508', {
  dialect: 'mysql',
  host: 'localhost',
})

const User = sequelize.define('user', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
})

User.sync()

module.exports = User
