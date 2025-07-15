<<<<<<< HEAD
const db = require('./setup')

beforeAll(async () => {
  await db.connect()
})

afterEach(async () => {
  await db.clearDatabase()
})

afterAll(done => {
  db.closeDatabase()
    .then(() => done())
    .catch(err => {
      // Evitamos que se dispare después de que Jest cerró
      process.nextTick(() => {
        console.error('❌ Error al cerrar la base de datos:', err)
        done()
      })
    })
}, 20000) // ⏱️ Máximo 20 segundos
=======
/* eslint-disable  */
require('dotenv').config()
const db = require('./setup.js')

beforeAll(async () => {
  await db.connect()
})

afterEach(async () => {
  await db.clearDatabase()
})
afterAll(async () => {
  await db.closeDatabase()
})
>>>>>>> d4e75b32c5873392989a5155d7adb24f8f81de50
