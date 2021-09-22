const Post = require('../models/Post')
const Like = require('../models/Like')

exports.getlike = (req, res, next) => {
    if(req.body.like === 1){
        const like = Like.build({
            post_id: req.params.post_id,
            user_id: req.body.userId,
        }) 
        like.save()
        .then(() => res.status(201).json({message: "Like added"}))
        .catch((error) => res.status(404).json({error}))
    }else{
        Like.findOne({
            where : {post_id: req.params.post_id, user_id: req.body.userId}
        })
        .then((like) => {
            if(like){
                like.destroy()
            res.status(200).json({message: "Like canceled"})
            }else {
                res.status(400).json({message: "No like in database"})
            }
        })
    }
}
