// auth-service/scripts/createSuperAdmin.js
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../src/models/User.js'

dotenv.config() // Cargar variables de entorno del archivo .env

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI).then(async () => {
  const exists = await User.findOne({ email: 'administrador@ejemplo.com' })
  if (exists) {
    console.log('❌ Ya existe un admin con ese correo')
    process.exit()
  }

  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = new User({
    username: 'superadministrador',
    email: 'administrador@ejemplo.com',
    password: hashedPassword,
    role: 'superadmin'
  })

  await admin.save()
  console.log('✅ Superadmin creado con éxito')
  process.exit()
}).catch((err) => {
  console.error('❌ Error al conectar a la DB:', err)
  process.exit(1)
})
