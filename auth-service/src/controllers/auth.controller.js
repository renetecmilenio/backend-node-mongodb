import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Verificar si ya existe un usuario con ese correo
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese correo' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 'cliente' // 👈 por defecto (puedes modificar si quieres)
    })

    await user.save()
    res.status(201).json({ message: 'Usuario registrado correctamente' })
  } catch (err) {
    console.error('❌ Error al registrar:', err)
    res.status(400).json({ message: 'Error al registrar', error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({ token, role: user.role, email: user.email })
  } catch (err) {
    console.error('❌ Error en login:', err)
    res.status(500).json({ message: 'Error interno en el login' })
  }
}
