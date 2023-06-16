import { Request, Response } from 'express'
import { ITask, TaskModel, TaskType } from 'src/models/task.model'

const getAllTasks = async (req: Request<{}, {}, {}>, res: Response) => {
  await TaskModel.find()
    .then((allTasks) => {
      res.status(200).json(allTasks)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params
  await TaskModel.findById(id)
    .then((task) => {
      res.status(200).json(task)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

const createTask = async (req: Request<{}, {}, TaskType>, res: Response) => {
  const newTask: ITask = new TaskModel<TaskType>({ ...req.body })
  await newTask
    .save()
    .then((insertedTask) => {
      res.status(201).json(insertedTask)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

const updateTask = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  await TaskModel.updateOne({ id }, req.body)
  await TaskModel.findById(id)
    .then((updatedTask) => {
      res.status(200).json(updatedTask)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

const deleteTask = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  await TaskModel.findByIdAndDelete(id)
    .then((deletedTask) => {
      res.status(200).json(deletedTask)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}

export { createTask, deleteTask, getAllTasks, getTask, updateTask }
