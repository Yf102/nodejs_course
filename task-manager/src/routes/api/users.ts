import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updatePartial,
  updateUser,
} from 'src/controllers/userController'

const UserRouter = Router()
  .get('', getAllUsers)
  .get('/:id', getUser)
  .post('/', createUser)
  .put('/:id', updateUser)
  .patch('/:id', updatePartial)
  .delete('/:id', deleteUser)

export default UserRouter
