import { Router } from 'express'
import { createUser, loginUser } from 'src/db/controllers/userController'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const AuthRouter = Router()
  .post('/login', loginUser)
  .post('/signup', createUser)

export default applyErrorHandlingMiddleware(AuthRouter)
