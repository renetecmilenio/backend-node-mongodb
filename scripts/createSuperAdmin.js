require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../src/models/User')

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const exists = await User.findOne({ email: 'admin@ejemplo.com' })
  if (exists) {
    console.log('Super admin already exists.')
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = new User({
    userName: 'superadmin',
    email: 'admin@ejemplo.com',
    password: hashedPassword,
    role: 'superadmin'
  })

  await admin.save()
  console.log('Super admin created successfully.')
  mongoose.connection.close()
  process.exit(1)
})
