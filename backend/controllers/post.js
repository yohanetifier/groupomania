const Post = require('../models/Post')
const User = require('../models/User')
const fs = require('fs')

exports.create = (req, res, next) => {
  const post = req.file ? (Post.build({
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    user_id: req.token.userId,
  })) : (Post.build({  description: req.body.description, user_id: req.token.userId, }))
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
    if (post.user_id === req.token.userId || req.token.admin){
      if (post.imageUrl){
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          console.log('file deleted')
        })
      }
      post.destroy({where: { id: req.params.id }})
      .then(() => res.status(200).json({message: "Post deleted"}))
      .catch(error => res.status(400).json({error}))
    }else {
      res.status(403).json({message: "Vous n'avez pas les droits pour supprimer ce post"})
    }
    
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
