import Database from '../src/db/mongoose'
import { TaskModel } from '../src/models/task.model'

const start = async () => {
  await Database()

  TaskModel.findByIdAndUpdate('6489bd872e2aaedae5f71cca', { completed: true })
    .then((user) => {
      console.log(user)
      return TaskModel.countDocuments({ completed: false })
    })
    .then((result) => {
      console.log(result)
    })
    .catch((e) => {
      console.log(e)
    })
}

start()
