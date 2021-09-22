const express = require('express'); 
const router = express.Router()
const likeCtrl = require('../controllers/like')

router.post('/:post_id', likeCtrl.createlike)
router.get('/bypost', likeCtrl.getAllLikeByPost)

module.exports = router