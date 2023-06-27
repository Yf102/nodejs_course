import app from 'src/app'
import request from 'supertest'

test('Should signup new user', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      name: 'Filip',
      email: 'filip@gmail.com',
      password: 'Test123',
    })
    .expect(201)
})
