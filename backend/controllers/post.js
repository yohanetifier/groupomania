const Post = require('../models/Post')
const User = require('../models/User')

exports.create = (req, res, next) => {
  const post = Post.build({
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    user_id: req.body.user_id,
  })
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post created' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.getAllPost = (req, res, next) => {
    Post.findAll({include: {model: User, required: true}})
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error}))
}


exports.getOnePost = (req, res, next ) => {
  Post.findOne({where: { id: req.params.id }, include: {model: User, required: true}})
  .then((post) => res.status(200).json(post))
  .catch(error => res.status(404).json({error}))
}

