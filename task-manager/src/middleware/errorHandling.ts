import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express'
import * as process from 'process'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'

const errorMiddleware = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV !== 'test') {
      console.log(err)
    }

    // TODO: Add file logging if required
    const _err = err.code ? err : ServerError.InternalServerError

    res.status(_err.code).json({ error: _err })
  } catch (err) {
    next(err)
  }
}

// This is required as error middleware handling doesn't catch async functions
// TODO: This will be fixed with express 5
// Wrap a route handler with try-catch block using error handling middleware
const wrapWithTryCatch = (controller: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

// Apply error handling middleware to each route handler in a router
const applyErrorHandlingMiddleware = (router: Router) => {
  router.stack.forEach((layer) => {
    layer?.route?.stack?.forEach((routeHandler: { handle: RequestHandler }) => {
      routeHandler.handle = wrapWithTryCatch(routeHandler.handle)
    })
  })

  return router
}

export { applyErrorHandlingMiddleware, errorMiddleware, wrapWithTryCatch }
