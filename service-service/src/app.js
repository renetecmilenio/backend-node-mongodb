import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import serviceRoutes from './routes/service.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/services', serviceRoutes)

app.get('/', (req, res) => {
  res.send('🟢 Service service funcionando')
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Service service en http://localhost:${PORT}`)
  })
})
