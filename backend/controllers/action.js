const Action = require('../models/Action'); 

exports.create = (req, res, next ) => {
    const action = Action.build({
        user_id: req.body.user_id, 
        comments: req.body.comments,
        id: req.body.id
    })
    action.save()
    .then(() => res.status(201).json({message: 'Comment created'}))
    .catch(error => res.status(404).json({error}))
}

exports.getAllAction = (req, res, next ) => {

}