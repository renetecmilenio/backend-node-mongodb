// const express = require('express')
// const app = express()
// const port = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })
require('dotenv').config(
  {
    path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
  }
)
const app = require('./src/app')
const connectDB = require('./src/config/db')

const port = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}).catch(err => {
  console.error('Failed to connect to the database:', err.message)
  process.exit(1) // Exit process with failure
})
