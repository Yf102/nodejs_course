import { Request } from 'express'
import { IUser } from 'src/models/user.model'

export type DecodedType = {
  _id: string
  iat: number
}

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}

export type UserRequestType<
  ReqParams = {},
  ResBody = {},
  ReqBody = {},
  ReqQuery = {}
> = Request<ReqParams, ResBody, ReqBody, ReqQuery> & {
  user?: IUser
  token?: string
}
