const Action = require('../models/Action')
const Post = require('../models/Post')
const User = require('../models/User')

exports.create = (req, res, next) => {
    const action = Action.build({
      user_id: req.token.userId,
      comments: req.body.comments,
      post_id: req.body.post_id,
    })
    action
      .save()
      .then(() => res.status(201).json({ message: 'Comment created' }))
      .catch((error) => res.status(404).json({ error }))
}

exports.getAllActionByPostId = (req, res, next) => {
  Action.findAll({
    where: { post_id: req.params.id },
    include: [Post, User],
    order: [['createdAt', 'DESC']],
    required: true,
  })
    .then((action) => res.status(200).json(action))
    .catch((error) => res.status(404).json({ error }))
}

exports.getAllActions = (req, res, next) => {
  Action.findAll()
    .then((action) => res.status(200).json(action))
    .catch((error) => res.status(404).json({ error }))
}

/* exports.deleteOneAction = (req, res, next) => {
  Action.destroy({
    where: { comment_id: req.params.id },
  })
    .then(() => res.status(200).json({ message: 'Comment deleted' }))
    .catch((error) => res.status(400).json({ error }))
} */

exports.deleteOneAction = (req, res, next) => {
  Action.findOne({ 
    where: {comment_id: req.params.id}
  }).then((action) => {
    if (action.user_id === req.token.userId || req.token.admin){
      Action.destroy({
        where: { comment_id: req.params.id },
      })
        .then(() => res.status(200).json({ message: 'Comment deleted' }))
        .catch((error) => res.status(400).json({ error }))
    }else {
      res.status(403).json({message : "Vous n'avez pas les droits"})
    }
  }).catch((error => res.status(400).json({error})))
}

exports.getCounterOfActionsById = (req, res, next) => {
  Action.findAndCountAll({
    where: { post_id: req.params.id },
  })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json({ error }))
}
