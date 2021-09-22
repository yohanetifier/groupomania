const Post = require('../models/Post')
const Like = require('../models/Like')

exports.createlike = (req, res, next) => {
  Like.findOne({
    where: {
      post_id: req.params.post_id,
      user_id: req.body.userId,
    },
  })
  .then((like) => {
    if (like) {
        like.destroy({
            where: { 
                post_id: req.params.id, 
                user_id: req.body.userId
        }})
        res.status(200).json({message: "Like canceled"})
    } else {
      const like = Like.build({
        post_id: req.params.post_id,
        user_id: req.body.userId,
      })
      like
        .save()
        .then(() => res.status(201).json({ message: 'Like added' }))
        .catch((error) => res.status(404).json({ error }))
    }
  })
}

exports.getAllLikeByPost = (req, res, next ) => {
    Like.findAll()
    .then((like) => res.status(200).json(like))
    .catch((error ) => res.status(404).json({error}))
}
