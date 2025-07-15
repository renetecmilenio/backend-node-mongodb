<<<<<<< HEAD
/* eslint-env jest */

const serviceController = require('../src/controllers/service.controller')
const Service = require('../src/models/Service')

jest.mock('../src/models/Service')

describe('Service Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('createService - debe crear servicio', async () => {
    const req = {
      body: { nombre: 'Test', precio: 100 },
      user: { userId: '123' }
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    Service.prototype.save = jest.fn().mockResolvedValue(req.body)

    await serviceController.createService(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(req.body)
  })
})
=======
/* eslint-disable  */
const serviceController = require('../src/controllers/service.controller')
const Service = require('../src/models/Service')


jest.mock('../src/models/Service')

describe('Service Controller', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('createService - debe crear un servicio', async () => {

        const req = {
            body: {
                title: 'Servicio de Prueba',
                description: 'Descripción del servicio de prueba'
            },
            user: {
                _id: '60c72b2f9b1d8c001c8e4e1a' // ID de usuario simulado
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }   

        Service.prototype.save = jest.fn().mockResolvedValue(req.body)
        await serviceController.createService(req, res)

   
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(req.body)

    })

}) // fin de describe
>>>>>>> d4e75b32c5873392989a5155d7adb24f8f81de50
