import { Request, Response } from 'express'
import { UserRequestType } from 'src/@types/Auth'
import { default as ServerError } from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import { IUser, UserModel, UserType } from 'src/models/user.model'

const getLoggedInUser = async (req: UserRequestType, res: Response) => {
  res.status(200).json(req.user)
}

const getUser = async (
  req: UserRequestType<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  const user = await UserModel.findById(id)
  if (!user) {
    throw new CustomError(ServerError.NotFound)
  }

  res.status(200).json(user)
}

const updateUser = async (
  req: UserRequestType<{ id: string }, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, name, email, age } = req.body

  const user = await UserModel.findById(req.params.id)
  if (!user) {
    throw new CustomError(ServerError.NotFound)
  }

  if (name) user.name = name
  if (email) user.email = email
  if (age) user.age = age
  if (password) user.setPassword(password)

  await user.save()
  res.status(200).json({ success: true })
}

const deleteUser = async (
  req: UserRequestType<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  const deletedUser = await UserModel.findByIdAndDelete(id, { new: true })
  if (!deletedUser) {
    throw new CustomError(ServerError.NotFound)
  }
  res.status(200).json(deletedUser)
}

const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError(ServerError.CredentialsRequired)
  }

  const user = await UserModel.findByCredentials(email, password)
  const token = await user?.generateAuthToken()
  res.status(200).json({ success: true, user, token })
}

const createUser = async (
  req: Request<{}, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, ...rest } = req.body
  if (!password) {
    throw new CustomError(ServerError.CredentialsRequired)
  }

  const newUser: IUser = new UserModel<UserType>(rest)
  newUser.setPassword(password)

  await newUser.save()
  const token = await newUser?.generateAuthToken()
  res.status(201).json({ success: true, token })
}

const logOutUser = async (req: UserRequestType, res: Response) => {
  if (!req.user) throw new CustomError(ServerError.NoAvailableSessionException)

  req.user.tokens = req.user?.tokens.filter((t) => t.token !== req.token)
  await req.user?.save()

  res.status(200).json({ success: true })
}

export {
  createUser,
  deleteUser,
  getLoggedInUser,
  getUser,
  logOutUser,
  loginUser,
  updateUser,
}
