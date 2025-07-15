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
