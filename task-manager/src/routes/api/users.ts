import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from 'src/controllers/userController'

const UserRouter = Router()
  .get('', getAllUsers)
  .get('/:id', getUser)
  .post('/', createUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)

export default UserRouter
