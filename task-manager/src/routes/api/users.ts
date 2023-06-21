import { Router } from 'express'
import {
  deleteUser,
  getLoggedInUser,
  getUser,
  logOutUser,
  logoutUserAll,
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
  .post('/logout/all', logoutUserAll)

export default applyErrorHandlingMiddleware(UserRouter)
