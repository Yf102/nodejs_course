import app from 'src/app'
import { UserModel } from 'src/db/models/user.model'
import request from 'supertest'
import { setupDB, userOne, userOneID } from 'tests/fixtures/db'

beforeEach(setupDB)

test('Should signup new user', async () => {
  const resp = await request(app)
    .post('/api/signup')
    .send({
      name: 'Filip',
      email: 'filip@gmail.com',
      password: 'Test123',
    })
    .expect(201)

  // Assert that DB was changed correctly
  const user = await UserModel.findById(resp.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(resp.body).toMatchObject({
    user: {
      name: 'Filip',
      email: 'filip@gmail.com',
    },
    token: user?.tokens[0].token,
  })
})

test('Should login existing user', async () => {
  const resp = await request(app)
    .post('/api/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)

  const user = await UserModel.findById(resp.body.user._id)
  expect(user).not.toBeNull()

  expect(resp.body.token).toBe(user?.tokens[1].token)
})

test('Should not login non existing user', async () => {
  await request(app)
    .post('/api/login')
    .send({
      email: userOne.email,
      password: 'ThisIsNotMyPass',
    })
    .expect(400)
})

test('Should get user profile', async () => {
  await request(app)
    .get('/api/user')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get user profile', async () => {
  await request(app)
    .get('/api/user')
    .send()
    .expect(401)
    .expect({
      error: {
        message: 'No Available Session Exception',
        code: 401,
      },
    })
})

test('Should upload avatar', async () => {
  await request(app)
    .post('/api/user/upload/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
    .expect({ success: true })

  const user = await UserModel.findById(userOneID)
  expect(user?.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/api/user')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Filip',
    })
    .expect(200)

  const user = await UserModel.findById(userOneID)
  expect(user?.name).toBe('Filip')
})

test('Should update not valid user fields', async () => {
  await request(app)
    .patch('/api/user')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Sofia',
    })
    .expect(400)
})

test('Should not update user if not authenticate', async () => {
  await request(app)
    .patch('/api/user')
    .send({
      name: 'Jason',
    })
    .expect(401)
})

test('Should not delete user', async () => {
  await request(app)
    .delete('/api/user')
    .expect(401)
    .expect({
      error: {
        message: 'No Available Session Exception',
        code: 401,
      },
    })
})

test('Should delete user', async () => {
  await request(app)
    .delete('/api/user')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)
    .expect({ success: true })

  const user = await UserModel.findById(userOneID)
  expect(user).toBeNull()
})
