import Database from '../src/db/mongoose'
import { UserModel } from '../src/models/user.model'

const start = async () => {
  const gg = await Database()

  UserModel.findByIdAndUpdate('648b38f85649470aef0b40ef', { age: 1 })
    .then((user) => {
      console.log(user)
      return UserModel.countDocuments({ age: 1 })
    })
    .then((result) => {
      console.log(result)
    })
    .catch((e) => {
      console.log(e)
    })
}

start()
