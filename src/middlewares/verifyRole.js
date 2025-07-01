module.exports = function verifyRole (roles) {
  return (req, res, next) => {
    const user = req.user
    if (!user || !user.role.includes(roles)) {
      return res.status(403).json({ message: 'Access denied' })
    }
    next()
  }
}
