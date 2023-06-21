import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from 'src/controllers/userController'
import AuthMiddleware from 'src/middleware/auth'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const UserRouter = Router()
  .get('/me', AuthMiddleware, getAllUsers)
  .get('/:id', AuthMiddleware, getUser)
  .post('/', createUser)
  .patch('/:id', AuthMiddleware, updateUser)
  .delete('/:id', AuthMiddleware, deleteUser)
  .post('/login', loginUser)

export default applyErrorHandlingMiddleware(UserRouter)
