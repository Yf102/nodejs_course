import { Router } from 'express'
import { UserRequestType } from 'src/@types/Auth'
import ServerError from 'src/const/server-errors'
import {
  deleteAvatar,
  deleteUser,
  getAvatar,
  getLoggedInUser,
  logOutUser,
  logoutUserAll,
  updateUser,
  uploadAvatar,
} from 'src/controllers/userController'
import { EmailSender } from 'src/emails/accounts'
import CustomError from 'src/errors/CustomError'
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
  .get('/send/welcome/email', async (req: UserRequestType, res) => {
    if (!req.user)
      throw new CustomError(ServerError.NoAvailableSessionException)
    const emailSender = new EmailSender()
    await emailSender.sendWelcomeEmail(req.user)
    res.status(200).json({ success: true })
  })

export default applyErrorHandlingMiddleware(UserRouter)
