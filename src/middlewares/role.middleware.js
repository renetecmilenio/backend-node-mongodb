const authorizeRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role // Assuming req.user is set by the auth middleware
    console.log('User role:', req.user.role)
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' })
    }

    next()
  }
}
module.exports = authorizeRole
