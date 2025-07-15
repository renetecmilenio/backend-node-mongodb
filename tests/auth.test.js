const request = require('supertest')
const app = require('../src/app')

describe('Auth Endpoints', () => {
  test('debe registrar un nuevo usuario', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
      // agrega otros campos necesarios
    })

    // console.log(res.statusCode, res.body)  <--- para debug

    expect(res.statusCode).toBe(201)
    // Cambiado para validar el mensaje actual que devuelve el backend
    expect(res.body.message).toBe('User registered successfully')
  })
})
