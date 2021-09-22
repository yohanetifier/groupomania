const { Sequelize, DataTypes, ABSTRACT } = require('sequelize')
const sequelize = new Sequelize('groupomania', 'root', 'Eti&300508', {
  dialect: 'mysql',
  host: 'localhost',
})

const User = require('./User')

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false,
        
    }, 
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false, 
        references: {
            model: User, 
            key: 'id', 
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    
})

User.hasOne(Post, {foreignKey: 'user_id'})
Post.belongsTo(User, {foreignKey: 'user_id'})
Post.sync()

module.exports = Post
