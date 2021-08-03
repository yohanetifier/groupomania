const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

router.post('/signup', userCtrl.signup)
router.post('/login/', userCtrl.login)
router.get('/update/:id', userCtrl.update)
router.put('/modify/:id', userCtrl.modify)
router.delete('/deleteprofile/:id', userCtrl.deleteProfile)
router.get('/getpassword/:id', userCtrl.getPassword)
router.put('/changepassword/:id', userCtrl.changePassword)

module.exports = router
