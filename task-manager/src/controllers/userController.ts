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

const createUser = async (req: Request<{}, {}, UserType>, res: Response) => {
  const newUser: IUser = new UserModel<UserType>({ ...req.body })
  try {
    await newUser.save()
    res.status(201).json(newUser)
  } catch (e) {
    res.status(400).json(e)
  }
}

const updateUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id: _id } = req.params
  try {
    await UserModel.updateOne({ _id }, req.body)
    const updatedUser = await UserModel.findById(_id)
    res.status(200).json(updatedUser)
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
    const deletedUser = await UserModel.findByIdAndDelete(id)
    res.status(200).json(deletedUser)
  } catch (e) {
    res.status(400).json(e)
  }
}

export { createUser, deleteUser, getAllUsers, getUser, updateUser }
