const { Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('groupomania', 'root', 'Eti&300508', {
    dialect: 'mysql',
    host: 'localhost',
  })

const Post = require('./Post')
const User = require('./User')

const Like = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false, 
        reference: {
            model: Post, 
            key: 'id',
        }
    }, 
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false, 
        references: {
            model: User, 
            key: 'id',
        }
    }
})

Post.hasOne(Like, {foreignKey: 'post_id'})
Like.belongsTo(Post, {foreignKey: 'post_id'})
User.hasOne(Like, {foreignKey: 'user_id'})
Like.belongsTo(User, {foreignKey: 'user_id'})
Like.sync()

module.exports = Like;

