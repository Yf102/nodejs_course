import { Router } from 'express'
import {
  deleteUser,
  getLoggedInUser,
  getUser,
  logOutUser,
  updateUser,
} from 'src/controllers/userController'
import AuthMiddleware from 'src/middleware/auth'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const UserRouter = Router()
  .use(AuthMiddleware)
  .get('/', getLoggedInUser)
  .get('/:id', getUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)
  .post('/logout', logOutUser)

export default applyErrorHandlingMiddleware(UserRouter)
