import { Router } from 'express'
import {
  deleteUser,
  getLoggedInUser,
  logOutUser,
  logoutUserAll,
  updateUser,
} from 'src/controllers/userController'
import AuthMiddleware from 'src/middleware/auth'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const UserRouter = Router()
  .use(AuthMiddleware)
  .get('/', getLoggedInUser)
  .patch('/', updateUser)
  .delete('/', deleteUser)
  .post('/logout', logOutUser)
  .post('/logout/all', logoutUserAll)

export default applyErrorHandlingMiddleware(UserRouter)
