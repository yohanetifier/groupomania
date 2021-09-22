const express = require('express'); 
const router = express.Router()
const likeCtrl = require('../controllers/like')

router.post('/:post_id', likeCtrl.getlike)

module.exports = router