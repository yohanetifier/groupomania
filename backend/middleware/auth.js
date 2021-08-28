const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'SECRET_RANDOM_KEY')
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw 'UserId non valable'
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée' })
  }
}
