import { Router } from 'express'
import {
  deleteAvatar,
  deleteUser,
  getAvatar,
  getLoggedInUser,
  logOutUser,
  logoutUserAll,
  updateUser,
  uploadAvatar,
} from 'src/db/controllers/userController'
import AuthMiddleware from 'src/middleware/auth'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const UserRouter = Router()
  .use(AuthMiddleware)
  .get('/', getLoggedInUser)
  .patch('/', updateUser)
  .delete('/', deleteUser)
  .post('/logout', logOutUser)
  .post('/logout/all', logoutUserAll)
  .post('/upload/avatar', uploadAvatar)
  .delete('/delete/avatar', deleteAvatar)
  .get('/avatar', getAvatar)

export default applyErrorHandlingMiddleware(UserRouter)
