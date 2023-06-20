import { Request, Response } from 'express'
import CustomError from 'src/errors/CustomError'
import { IUser, UserModel, UserType } from 'src/models/user.model'

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find()
  res.status(200).json(users)
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await UserModel.findById(id)
  if (!user) {
    throw new CustomError('Not Found', 404)
  }

  res.status(200).json(user)
}

const createUser = async (
  req: Request<{}, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, ...rest } = req.body
  if (!password) {
    throw new CustomError('Password is required', 400)
  }

  const newUser: IUser = new UserModel<UserType>(rest)
  newUser.setPassword(password)

  await newUser.save()
  const token = await newUser?.generateAuthToken()
  res.status(201).json({ success: true, token })
}

const updateUser = async (
  req: Request<{ id: string }, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, name, email, age } = req.body

  const user = await UserModel.findById(req.params.id)
  if (!user) {
    throw new CustomError('Not found', 404)
  }

  if (name) user.name = name
  if (email) user.email = email
  if (age) user.age = age
  if (password) user.setPassword(password)

  await user.save()
  res.status(200).json({ success: true })
}

const deleteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  const deletedUser = await UserModel.findByIdAndDelete(id, { new: true })
  if (!deletedUser) {
    // return res.status(404).json({ error: 'Not found' })
    throw new CustomError('Not Found', 400)
  }
  res.status(200).json(deletedUser)
}

const loginUser = async (
  req: Request<{ id: string }, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError('Email and Password must be provided', 400)
  }

  const user = await UserModel.findByCredentials(email, password)
  const token = await user?.generateAuthToken()
  res.status(201).json({ success: true, user, token })
}

export { createUser, deleteUser, getAllUsers, getUser, loginUser, updateUser }
