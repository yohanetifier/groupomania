const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const multer = require('../middleware/multer-config')

router.post('/signup', userCtrl.signup)
router.post('/login/', userCtrl.login)
router.get('/update/:id', multer, userCtrl.update)
router.put('/modify/:id', multer, userCtrl.modify)
router.delete('/deleteprofile/:id', userCtrl.deleteProfile)
router.get('/getpassword/:id', userCtrl.getPassword)
router.put('/changepassword/:id', userCtrl.changePassword)

module.exports = router
