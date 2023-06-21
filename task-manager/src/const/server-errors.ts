const ServerError = {
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
}

export default ServerError
