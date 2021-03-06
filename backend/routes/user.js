const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Reessayer après 15 minutes',
})

router.post('/signup', userCtrl.signup)
router.post('/login/', userCtrl.login)
router.get('/users', userCtrl.getAllUsers)
router.get('/update/:id', auth, multer, userCtrl.update)
router.put('/modify/:id', auth, multer, userCtrl.modify)
router.delete('/deleteprofile/:id', auth, userCtrl.deleteProfile)
router.get('/getpassword/:id', auth, userCtrl.getPassword)
router.put('/changepassword/:id', auth, userCtrl.changePassword)

module.exports = router
