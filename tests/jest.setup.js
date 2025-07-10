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
