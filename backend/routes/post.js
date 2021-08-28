const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/post')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.post('/', auth, multer, postCtrl.create)
router.get('/', auth, postCtrl.getAllPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.delete('/delete/:id', auth, postCtrl.deleteOnePost)

module.exports = router
