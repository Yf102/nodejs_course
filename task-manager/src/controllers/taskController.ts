import { Request, Response } from 'express'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import { ITask, TaskModel, TaskType } from 'src/models/task.model'

const getAllTasks = async (req: Request<{}, {}, {}>, res: Response) => {
  const tasks = await TaskModel.find()
  res.status(200).json(tasks)
}

const getTask = async (req: Request, res: Response) => {
  const task = await TaskModel.findById(req.params.id)
  if (!task) {
    throw new CustomError(ServerError.NotFound)
  }
  res.status(200).json(task)
}

const createTask = async (req: Request<{}, {}, TaskType>, res: Response) => {
  const newTask: ITask = new TaskModel<TaskType>({ ...req.body })
  const insertedTask = await newTask.save()
  res.status(201).json(insertedTask)
}

const updateTask = async (
  req: Request<{ id: string }, {}, TaskType>,
  res: Response
) => {
  const { id } = req.params
  const { description, completed } = req.body

  const task = await TaskModel.findById(id)

  if (!task) {
    throw new CustomError(ServerError.NotFound)
  }

  if (description) task.description = description
  if (completed) task.completed = completed

  await task.save()

  res.status(200).json({ success: true })
}

const deleteTask = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  const deletedTask = await TaskModel.findByIdAndDelete(id)
  if (!deletedTask) {
    throw new CustomError(ServerError.NotFound)
  }
  res.status(200).json(deletedTask)
}

export { createTask, deleteTask, getAllTasks, getTask, updateTask }
