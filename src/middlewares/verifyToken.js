const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' })
  }
  const token = authHeader.split(' ')[1] // Bearer
  if (!token) {
    return res.status(401).json({ message: 'token no proporcionado' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Error al obtener token' })
    }
    req.user = user
    next()
  })
}
