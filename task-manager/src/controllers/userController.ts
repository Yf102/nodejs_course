import { Request, Response } from 'express'
import { IUser, UserModel, UserType } from 'src/models/user.model'

const getAllUsers = async (req: Request<{}, {}, {}>, res: Response) => {
  await UserModel.find()
    .then((allUsers) => {
      res.status(200).json(allUsers)
    })
    .catch((e) => {
      res.status(500).json(e)
    })
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  await UserModel.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'not found' })
      }

      res.status(200).json(user)
    })
    .catch((e) => {
      res.status(500).json(e)
    })
}

const createUser = async (req: Request<{}, {}, UserType>, res: Response) => {
  const newUser: IUser = new UserModel<UserType>({ ...req.body })
  await newUser
    .save()
    .then((insertedUser) => {
      res.status(201).json(insertedUser)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

const updateUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id: _id } = req.params
  await UserModel.updateOne({ _id }, req.body)
  await UserModel.findById(_id)
    .then((updatedUser) => {
      res.status(200).json(updatedUser)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

const deleteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  await UserModel.findByIdAndDelete(id)
    .then((deletedUser) => {
      res.status(200).json(deletedUser)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

export { createUser, deleteUser, getAllUsers, getUser, updateUser }
