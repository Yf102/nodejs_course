import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '@/controllers/taskController'
import { Router } from 'express'

const TaskRouter = Router()
  .get('', getAllTasks)
  .get('/:id', getTask)
  .post('/', createTask)
  .patch('/:id', updateTask)
  .delete('/:id', deleteTask)

export default TaskRouter
