import { Request } from 'express'
import { IUser } from 'src/models/user.model'

export type DecodedType = {
  _id: string
  iat: number
}

export type UserRequestType<
  ReqParams = {},
  ResBody = {},
  ReqBody = {},
  ReqQuery = {}
> = Request<ReqParams, ResBody, ReqBody, ReqQuery> & {
  user?: IUser
}
