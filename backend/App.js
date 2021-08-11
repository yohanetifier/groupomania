const express = require('express')
const { Sequelize, DataTypes, Model } = require('sequelize')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const path = require('path')
const User = require('../backend/models/User')
const Post = require('../backend/models/Post')

const app = express()
const sequelize = new Sequelize('groupomania', 'root', 'Eti&300508', {
  dialect: 'mysql',
  host: 'localhost',
})


try {
  sequelize.authenticate()
  console.log('Connecté à la base de données MySQL!')
} catch (error) {
  console.log('Impossible de se connecter, erreur suivante: ', error)
}

sequelize.sync()


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})


app.use(bodyParser.json())
app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app
