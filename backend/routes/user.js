const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router
