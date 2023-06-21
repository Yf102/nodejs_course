import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { DecodedType, UserRequestType } from 'src/@types/Auth'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import { wrapWithTryCatch } from 'src/middleware/errorHandling'
import { UserModel } from 'src/models/user.model'

const AuthMiddleware = wrapWithTryCatch(
  async (req: UserRequestType, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
      throw new CustomError(ServerError.InternalServerError)
    }

    const token = req.header('Authorization')?.replace('Bearer ', '') || ''

    let _decoded: DecodedType = { _id: '', iat: 0 }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new CustomError(ServerError.NoAvailableSessionException)
      }
      _decoded = decoded as DecodedType
    })

    const user = await UserModel.findOne({
      _id: _decoded?._id,
      'tokens.token': token,
    })

    if (!user) {
      throw new CustomError(ServerError.NoAvailableSessionException)
    }

    req.user = user
    next()
  }
)

export default AuthMiddleware
