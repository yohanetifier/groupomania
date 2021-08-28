const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
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
              .then((user) => res.status(201).json({ userId: user.id }))
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

exports.update = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) =>
      res.status(200).json({
        userId: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        admin: user.admin,
      })
    )
    .catch((error) => res.status(404).json({ error }))
}

exports.modify = (req, res, next) => {
  const userObject = req.file
    ? {
        bio: req.body.bio,
        avatar: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    if (user.avatar && req.file) {
      const filename = user.avatar.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        console.log('file deleted')
      })
    }
    if (req.body.bio || req.file) {
      User.update({ ...userObject }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Thing updated' }))
        .catch((error) => res.status(404).json({ error }))
    } else {
      return res.status(404).json({ message: 'Nothing updated' })
    }
    /* User.update({ ...userObject}, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Thing updated' }))
    .catch((error) => res.status(404).json({ error })) */
  })
  /* User.update({ ...userObject}, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Thing updated' }))
    .catch((error) => res.status(404).json({ error })) */
}

exports.deleteProfile = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.avatar) {
        const filename = user.avatar.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          console.log('file deleted')
        })
      }
      user.destroy({
        where: { id: req.params.id },
      })
    })
    .catch((error) => res.status(400).json({ error }))
}

exports.getPassword = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json({ password: user.password }))
    .catch((error) => res.status(400).json({ error }))
}

exports.changePassword = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    bcrypt
      .compare(req.body.oldpassword, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(404).json({ message: 'Old password is incorrect' })
        }
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            User.update(
              { password: hash },
              { where: { id: req.params.id } }
            ).then(() =>
              res.status(200).json({ message: 'Password updated successfully' })
            )
          })
          .catch((error) => res.status(404).json({ error }))
      })
      .catch(() => res.status(404).json({ message: "Password doesn't change" }))
  })
}
