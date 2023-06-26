import { TaskModel } from 'task-manager/src/db/models/task.model'
import Database from '../src/db/mongoose'

const start = async (id: string) => {
  await Database()
  await TaskModel.findByIdAndDelete(id)
  return TaskModel.countDocuments({ completed: false })
}

start('6489bd872e2aaedae5f71cca')
  .then((result) => {
    console.log('result', result)
  })
  .catch((e) => {
    console.log('e', e)
  })
