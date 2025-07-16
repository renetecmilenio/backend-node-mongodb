import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/Service.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'Usuario registrado' })
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar', error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' })

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Error en login' })
  }
}
