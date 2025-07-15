/* eslint-disable */
const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const User = require('../src/models/User')
const mongoose = require('mongoose')

describe('Protected Routes', () => {
    let token
    
    beforeAll(async () => {
        // Create a test user
        const user = new User({
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        })

        await user.save()

        // Generate a token for the test user
        token = jwt.sign({
            userId: user._id, 
            role: user.role },
             process.env.JWT_SECRET, 
            { expiresIn: '1h' }
            )

    })

    afterAll(async () => {
        // Clean up the test user
        await User.deleteMany({ })
        await mongoose.connection.close()    
    })

    test('Debe acceder a una ruta protegida con un token válido', async () => {
        const res = await request(app)
            .get('/api/services')
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('Services retrieved successfully')
    })
    
})
