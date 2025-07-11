/* eslint-disable */

const request = require('supertest')
const app = require('../src/app')

describe('Auth endpoints', () => {
    test('debe registrar un nuevo usuario', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({
            email: 'test@example.com',
            password: 'password123'
        })

        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe('User registered successfully')
    })

    test('debe hacer login con un usuario valido', async () => {
        await request(app)
        .post('/api/auth/register')
        .send({
            email: 'login@example.com',
            password: 'password123'
        })

        const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'login@example.com',
            password: 'password123'
        })

        expect(res.statusCode).toBe(200)
        expect(res.body.token).toBeDefined()
    
    })

    it('no debe permitir registro con email duplicado invalidas', async () => {
        await request(app)
        .post('/api/auth/register')
        .send({
            email: 'duplicado@ejemplo.com',
            password: 'password123'
        })
    
        const res = await request(app)
        .post('/api/auth/register')
        .send({
            email: 'duplicado@ejemplo.com',
            password: 'password123'
        })

        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('User already exists')
    })

    test('no debe permitir login con credenciales invalidas', async () => {
        await request(app)
        .post('/api/auth/register')
        .send({
            email: 'falla@exemplae.com',
            password: 'password123'
        })

        const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'falla@exemplae.com',
            password: 'wrongpassword'
        })

        expect(res.statusCode).toBeGreaterThanOrEqual(400)
        expect(res.statusCode).toBeLessThan(500)
        expect(res.body.message).toBe('Invalid credentials')
    })




}) // final de describe
