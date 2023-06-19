import Database from '../src/db/mongoose'
import { UserModel } from '../src/models/user.model'

const start = async (id: string, age: number) => {
  await Database()
  await UserModel.findByIdAndUpdate(id, { age })
  return UserModel.countDocuments({ age })
}

start('648eff6433153b5ac8637ef9', 30)
  .then((result) => {
    console.log('result', result)
  })
  .catch((e) => {
    console.log('e', e)
  })
