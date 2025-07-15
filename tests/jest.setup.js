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
