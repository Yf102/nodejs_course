import { Response } from 'express'
import { UserRequestType } from 'src/@types/Auth'
import { Virtual } from 'src/const/models'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import { ITask, TaskModel, TaskType } from 'src/models/task.model'

const getAllTasks = async (req: UserRequestType, res: Response) => {
  await req.user?.populate(Virtual.TASKS)
  res.status(200).json(req.user?.tasks)
}

const getTask = async (
  req: UserRequestType<{ id: string }, {}, {}>,
  res: Response
) => {
  // const task = await TaskModel.findById(req.params.id)
  const task = await TaskModel.findOne({
    _id: req.params.id,
    owner: req.user?._id,
  })

  if (!task) {
    throw new CustomError(ServerError.NotFound)
  }
  res.status(200).json(task)
}

const createTask = async (
  req: UserRequestType<{}, {}, TaskType>,
  res: Response
) => {
  const newTask: ITask = new TaskModel<TaskType>({
    ...req.body,
    owner: req.user?._id,
  })
  const insertedTask = await newTask.save()
  res.status(201).json(insertedTask)
}

const updateTask = async (
  req: UserRequestType<{ id: string }, {}, TaskType>,
  res: Response
) => {
  // TODO: Separate with types
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )
  // TODO: END

  if (!isValidOperation) {
    throw new CustomError(ServerError.InvalidUpdate)
  }

  const { id } = req.params
  const { description, completed } = req.body

  const task = await TaskModel.findOne({ _id: id, owner: req.user?._id })

  if (!task) {
    throw new CustomError(ServerError.NotFound)
  }

  if (description) task.description = description
  if (completed) task.completed = completed

  await task.save()

  res.status(200).json({ success: true, task })
}

const deleteTask = async (
  req: UserRequestType<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id: _id } = req.params

  const deletedTask = await TaskModel.findOneAndDelete({
    _id,
    owner: req.user?._id,
  })

  if (!deletedTask) {
    throw new CustomError(ServerError.NotFound)
  }

  res.status(200).json(deletedTask)
}

export { createTask, deleteTask, getAllTasks, getTask, updateTask }
