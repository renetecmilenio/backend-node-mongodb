const express = require('express')
const app = express()

const helmet = require('helmet')

// Middleware
app.use(express.json())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
