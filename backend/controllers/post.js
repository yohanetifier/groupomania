const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

exports.create = (req, res, next) => {
  const post = req.file ? (Post.build({
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    user_id: req.body.user_id,
  })) : (Post.build({  description: req.body.description, user_id: req.body.user_id, }))
  /* const post = Post.build({
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    user_id: req.body.user_id,
  }) */
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post created' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.getAllPost = (req, res, next) => {
    Post.findAll({order: [['createdAt', 'DESC']], include: {model: User, required: true}})
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error}))
}


exports.getOnePost = (req, res, next ) => {
  Post.findOne({where: { id: req.params.id }, include: {model: User, required: true}})
  .then((post) => res.status(200).json(post))
  .catch(error => res.status(404).json({error}))
}


exports.deleteOnePost = (req, res ,next ) => {
  Post.findOne({
    where: {id: req.params.id}
  })
  .then((post) => {
    if (post.imageUrl){
      const filename = post.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        console.log('file deleted')
      })
    }
    post.destroy({where: { id: req.params.id }})
    .then(() => res.status(200).json({message: "Post deleted"}))
    .catch(error => res.status(400).json({error}))
  })
  .catch(error => res.status(400).json({error}))
}

exports.getPostByUserId = (req, res, next ) => {
  Post.findAll({ 
    where : {user_id: req.params.userId}, order: [['createdAt', 'DESC']], include: {model: User, required: true}})
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(400).json({ error }))
}

exports.getALlPosts = (req, res, next ) => {
  Post.findAll()
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(400).json({error}))
}
