import { Request, Response } from 'express'
import { IUser, UserModel, UserType } from 'src/models/user.model'

const getAllUsers = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'not found' })
    }

    res.status(200).json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

const createUser = async (
  req: Request<{}, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, ...rest } = req.body
  if (!password) {
    return res.sendStatus(400).json({ error: 'Password is required' })
  }

  const newUser: IUser = new UserModel<UserType>(rest)
  newUser.setPassword(password)

  try {
    await newUser.save()
    res.status(201).json({ success: true })
  } catch (e) {
    res.status(400).json(e)
  }
}

const updateUser = async (
  req: Request<{ id: string }, {}, UserType & { password: string }>,
  res: Response
) => {
  const { password, name, email, age } = req.body

  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.sendStatus(404).json({ error: 'Not found' })
    }

    if (name) user.name = name
    if (email) user.email = email
    if (age) user.age = age
    if (password) user.setPassword(password)

    await user.save()
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(400).json(e)
  }
}

const deleteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id, { new: true })
    if (!deletedUser) {
      return res.status(404).json({ error: 'Not found' })
    }
    res.status(200).json(deletedUser)
  } catch (e) {
    res.status(400).json(e)
  }
}

const loginUser = async (
  req: Request<{ id: string }, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findByCredentials(email, password)
    const token = await user?.generateAuthToken()
    res.status(201).json({ success: true, user, token })
  } catch (e) {
    res.status(400).send({ error: true, e })
  }
}

export { createUser, deleteUser, getAllUsers, getUser, loginUser, updateUser }
