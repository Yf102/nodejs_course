import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { TaskModel, TaskType } from 'src/db/models/task.model'
import { UserModel, UserType } from 'src/db/models/user.model'

const userOneID = new Types.ObjectId()
const userOne = {
  _id: userOneID,
  name: 'Gosho',
  email: 'gosho@gmail.com',
  password: 'Test123',
  tokens: [
    {
      token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET || ''),
    },
  ],
}

const userTwoID = new Types.ObjectId()
const userTwo = {
  _id: userTwoID,
  name: 'Sean',
  email: 'sean@gmail.com',
  password: 'Test321',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET || ''),
    },
  ],
}

type TaskTypeMock = { _id: Types.ObjectId } & TaskType

const taskOne: TaskTypeMock = {
  _id: new Types.ObjectId(),
  description: 'First task',
  completed: false,
  owner: userOneID,
}

const taskTwo: TaskTypeMock = {
  _id: new Types.ObjectId(),
  description: 'Second task',
  completed: true,
  owner: userOneID,
}

const taskThree: TaskTypeMock = {
  _id: new Types.ObjectId(),
  description: 'Third task',
  completed: true,
  owner: userTwoID,
}

const setupDB = async () => {
  // Clean DB
  await UserModel.deleteMany()
  await TaskModel.deleteMany()

  // Prepare Users
  const _userOne = new UserModel<UserType>(userOne)
  _userOne.setPassword(userOne.password)
  await _userOne.save()

  const _userTwo = new UserModel<UserType>(userTwo)
  _userTwo.setPassword(userTwo.password)
  await _userTwo.save()

  // Prepare Tasks
  new TaskModel<TaskType>(taskOne).save()
  new TaskModel<TaskType>(taskTwo).save()
  new TaskModel<TaskType>(taskThree).save()
}

export {
  setupDB,
  taskOne,
  taskThree,
  taskTwo,
  userOne,
  userOneID,
  userTwo,
  userTwoID,
}
