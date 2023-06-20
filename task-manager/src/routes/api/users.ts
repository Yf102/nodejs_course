import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from 'src/controllers/userController'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const UserRouter = Router()
  .get('', getAllUsers)
  .get('/:id', getUser)
  .post('/', createUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)
  .post('/login', loginUser)

export default applyErrorHandlingMiddleware(UserRouter)
