const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.register = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existeUsuario = await User.findOne({ email })
    // Check if user already exists
    if (existeUsuario) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const nuevoUsuario = new User({
      email,
      password: hashedPassword
    })

    await nuevoUsuario.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
