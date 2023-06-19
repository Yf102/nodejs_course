import Database from '../src/db/mongoose'
import { TaskModel } from '../src/models/task.model'

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
