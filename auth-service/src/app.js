import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('🟢 Auth service funcionando')
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Auth service en http://localhost:${PORT}`)
  })
})
