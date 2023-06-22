import { Router } from 'express'
import { TaskRequest } from 'src/@types/Auth'
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from 'src/controllers/taskController'
import AuthMiddleware from 'src/middleware/auth'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'
import { parseGetAllQuery } from 'src/utils/Tasks'

export type ParseGetAllQueryType = {
  completed?: 'true' | 'false'
  limit?: string
  skip?: string
}

const TaskRouter = Router()
  .use(AuthMiddleware)
  .get(
    '/',
    async (req: TaskRequest<{}, {}, {}, ParseGetAllQueryType>, res, next) => {
      req.parsedQuery = parseGetAllQuery(req.query)
      next()
    },
    getAllTasks
  )
  .get('/:id', getTask)
  .post('/', createTask)
  .patch('/:id', updateTask)
  .delete('/:id', deleteTask)

export default applyErrorHandlingMiddleware(TaskRouter)
