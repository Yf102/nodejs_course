import { allowedSorting } from 'src/@types/Tasks'

const ServerError: Record<string, { msg: string; code: number }> = {
  NoAvailableSessionException: {
    msg: 'NoAvailableSessionException',
    code: 401,
  },
  InternalServerError: {
    msg: 'Internal Server Error',
    code: 500,
  },
  CredentialsRequired: {
    msg: 'Email and Password must be provided',
    code: 400,
  },
  InvalidCredentials: {
    msg: 'Invalid credentials',
    code: 400,
  },
  NotFound: {
    msg: 'Not Found',
    code: 404,
  },
  InvalidUpdate: {
    msg: 'Invalid Updates',
    code: 400,
  },
  InvalidSorting: {
    msg: `Allowed sorting values: ${allowedSorting.toString()}`,
    code: 400,
  },
}

export default ServerError
