require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
})

const express = require('express')
const app = express()

const helmet = require('helmet')

const authRoutes = require('./routes/auth.routes')
const serviceRoutes = require('./routes/service.routes')
const userRoutes = require('./routes/user.routes')
const adminRoutes = require('./routes/admin.routes')

// Middleware
app.use(express.json())

// Security headers
const rateLimit = require('express-rate-limit')
const { xss } = require('express-xss-sanitizer')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
})

// middleware security
app.use(helmet())
app.use(limiter)
app.use(xss())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log('Hello World!')
})

module.exports = app
