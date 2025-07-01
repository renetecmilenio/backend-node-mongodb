const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

const verifyToken = require('../middlewares/verifyToken')
const verifyRole = require('../middlewares/verifyRole')

router.post('/create-admin', verifyToken, verifyRole('superadmin'), async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      email,
      password: hashedPassword,
      role: 'admin' // Set the role to admin
    })

    await newUser.save()
    res.status(201).json({ message: 'Admin created successfully' })
  } catch (error) {
    console.error('Error creating admin:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
