const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

/* exports.signup = (req, res, next) => {
    bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = User.build({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.mail,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'new User' }))
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
  
} */

/* VALIDATION EMAIL */

function validateEmail(email) {
  var emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i)
  var valid = emailReg.test(email)

  if (!valid) {
    return false
  } else {
    return true
  }
}

/* VALIDATE PASSWORD */

function validatePassword(password) {
  var passwordReg = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  )
  var valid = passwordReg.test(password)

  if (valid) {
    return true
  } else {
    return false
  }
}

/* CONFIRM PASSWORD */

/* MIDDLEWARE */

exports.signup = (req, res, next) => {
  var confirmPassword = req.body.password === req.body.confirmpassword
  if (
    validateEmail(req.body.mail) &&
    validatePassword(req.body.password) &&
    confirmPassword
  ) {
    User.findOne({
      where: { email: req.body.mail },
    })
      .then((user) => {
        if (!user) {
          return bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = User.build({
              nom: req.body.nom,
              prenom: req.body.prenom,
              email: req.body.mail,
              password: hash,
            })
            user
              .save()
              .then(() => res.status(201).json({ message: 'new User' }))
              .catch((error) => res.status(500).json({ error }))
          })
        }
        res.status(401).json({ message: 'Account already exist' })
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    res.status(401).json({ message: 'Error occured ' })
  }
}

exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.mail },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Wrong password' })
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, 'SECRET_RANDOM_KEY', {
              expiresIn: '24h',
            }),
          })
          
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}




