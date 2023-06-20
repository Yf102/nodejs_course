import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from 'src/controllers/taskController'
import { applyErrorHandlingMiddleware } from 'src/middleware/errorHandling'

const TaskRouter = Router()
  .get('', getAllTasks)
  .get('/:id', getTask)
  .post('/', createTask)
  .patch('/:id', updateTask)
  .delete('/:id', deleteTask)

export default applyErrorHandlingMiddleware(TaskRouter)
