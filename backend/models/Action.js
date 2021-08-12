const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('groupomania', 'root', 'Eti&300508', {
  dialect: 'mysql',
  host: 'localhost',
})

const Post = require('./Post')
const User= require('./User')

const Action = sequelize.define('action', {
    comment_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Post, 
            key:'id',
        }
    }, 
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNul: false, 
        references: {
            model: User,
            key: 'id'
        }
    }, 
    comments: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
})



module.exports = Action;  