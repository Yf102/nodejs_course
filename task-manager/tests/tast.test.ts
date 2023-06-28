import app from 'src/app'
import { TaskModel } from 'src/db/models/task.model'
import request from 'supertest'
import { setupDB, taskOne, userOne, userTwo } from 'tests/fixtures/db'

beforeEach(setupDB)

test('Should create a task', async () => {
  const resp = await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Test description',
    })
    .expect(201)

  const task = await TaskModel.findById(resp.body._id)
  expect(task).not.toBeNull()
  expect(task?.completed).toBe(false)
})

test('Should Get all tasks for user one', async () => {
  const resp = await request(app)
    .get('/api/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

  expect(resp.body.length).toBe(2)
})

test('Should not delete other users tasks', async () => {
  await request(app)
    .delete(`/api/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(404)

  const task = await TaskModel.findById(taskOne._id)
  expect(task).not.toBeNull()
})
