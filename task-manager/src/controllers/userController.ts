import { Request, Response } from 'express'
import { UserRequestType } from 'src/@types/Auth'
import { default as ServerError } from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import { IUser, UserModel, UserType } from 'src/models/user.model'

const getLoggedInUser = async (req: UserRequestType, res: Response) => {
  res.status(200).json(req.user)
}

const updateUser = async (
  req: UserRequestType<{}, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, name, email, age } = req.body

  // const user = await UserModel.findById(req.params.id)
  if (!req.user) {
    throw new CustomError(ServerError.NotFound)
  }

  if (name) req.user.name = name
  if (email) req.user.email = email
  if (age) req.user.age = age
  if (password) req.user.setPassword(password)

  await req.user.save()
  res.status(200).json({ success: true, user: req.user })
}

const deleteUser = async (req: UserRequestType, res: Response) => {
  await req.user?.deleteOne()
  res.status(200).json({ success: true })
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

  const user: IUser = new UserModel<UserType>(rest)
  user.setPassword(password)

  await user.save()
  const token = await user?.generateAuthToken()
  res.status(201).json({ success: true, user, token })
}

const logOutUser = async (req: UserRequestType, res: Response) => {
  if (!req.user) throw new CustomError(ServerError.NoAvailableSessionException)

  req.user.tokens = req.user?.tokens.filter((t) => t.token !== req.token)
  await req.user?.save()

  res.status(200).json({ success: true })
}

const logoutUserAll = async (req: UserRequestType, res: Response) => {
  if (!req.user) return

  req.user.tokens = []
  await req.user?.save()

  res.status(200).json({ success: true })
}

export {
  createUser,
  deleteUser,
  getLoggedInUser,
  logOutUser,
  loginUser,
  logoutUserAll,
  updateUser,
}
