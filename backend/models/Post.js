const { Sequelize, DataTypes } = require('sequelize')
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
        allowNull: false,
    }, 
    likes: {
        type: DataTypes.INTEGER.UNSIGNED, 
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
    dislikes: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true, 
    }, 
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
})

User.hasOne(Post, {foreignKey: 'user_id'})
Post.belongsTo(User, {foreignKey: 'user_id'})
Post.sync()

module.exports = Post

/* user_id: {
    type: DataTypes.INTEGER.UNSIGNED, 
    allowNull: false, 
    references: {
        model: User, 
        key: 'id', 
    } */