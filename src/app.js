const express = require('express')
const app = express()

const helmet = require('helmet')

const authRoutes = require('./routes/auth.routes')
const serviceRoutes = require('./routes/service.routes')
const userRoutes = require('./routes/user.routes')

// Middleware
app.use(express.json())
app.use(helmet())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
