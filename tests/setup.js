<<<<<<< HEAD
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

module.exports = {
  connect: async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    await mongoose.connect(uri, {
      dbName: 'test' // se puede poner explícitamente
    })
  },

  closeDatabase: async () => {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
      }
      if (mongoServer) {
        await mongoServer.stop()
      }
    } catch (err) {
      console.error('❌ Error al cerrar la base de datos:', err)
      throw err
    }
  },

  clearDatabase: async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany()
    }
  }
}
=======
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

module.exports = {
  connect: async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri, {
      dbName: 'test'
    })
  },

  closeDatabase: async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
      }
      if (mongoServer) {
        await mongoServer.stop()
      }
    } catch (error) {
      console.error('Error closing database:', error)
      throw error
    }
  },

  clearDatabase: async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany({})
    }
  }
}
>>>>>>> d4e75b32c5873392989a5155d7adb24f8f81de50
