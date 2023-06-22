import { allowedSorting } from 'src/@types/Tasks'

const ServerError: Record<string, { message: string; code: number }> = {
  NoAvailableSessionException: {
    message: 'No Available Session Exception',
    code: 401,
  },
  InternalServerError: {
    message: 'Internal Server Error',
    code: 500,
  },
  CredentialsRequired: {
    message: 'Email and Password must be provided',
    code: 400,
  },
  InvalidCredentials: {
    message: 'Invalid credentials',
    code: 400,
  },
  NotFound: {
    message: 'Not Found',
    code: 404,
  },
  InvalidUpdate: {
    message: 'Invalid Updates',
    code: 400,
  },
  InvalidSorting: {
    message: `Allowed sorting values: ${allowedSorting.toString()}`,
    code: 400,
  },
  JpgOnlyAllowed: {
    message: 'Only jpg files are accepted',
    code: 400,
  },
}

export default ServerError
