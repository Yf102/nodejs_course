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
  token?: string
}

type ParsedQueryType = {
  options: {
    limit?: number
    skip?: number
  }
  match: {
    completed?: boolean
  }
}

export type TaskRequest<
  ReqParams = {},
  ResBody = {},
  ReqBody = {},
  ReqQuery = {}
> = UserRequestType<ReqParams, ResBody, ReqBody, ReqQuery> & {
  parsedQuery?: ParsedQueryType
}
