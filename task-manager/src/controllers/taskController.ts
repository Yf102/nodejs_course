import { Request, Response } from 'express'
import { ITask, TaskModel, TaskType } from 'src/models/task.model'

const getAllTasks = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const tasks = await TaskModel.find()
    res.status(200).json(tasks)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const task = await TaskModel.findById(id)
    if (!task) {
      return res.status(404).json({ error: 'not found' })
    }
    res.status(200).json(task)
  } catch (e) {
    res.status(500).json(e)
  }
}

const createTask = async (req: Request<{}, {}, TaskType>, res: Response) => {
  const newTask: ITask = new TaskModel<TaskType>({ ...req.body })
  try {
    const insertedTask = await newTask.save()
    res.status(201).json(insertedTask)
  } catch (e) {
    res.status(400).json(e)
  }
}

const updateTask = async (
  req: Request<{ id: string }, {}, TaskType>,
  res: Response
) => {
  const { id } = req.params
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedTask) {
      return res.status(404).json({ error: 'Not found' })
    }
    res.status(200).json(updatedTask)
  } catch (e) {
    res.status(400).json(e)
  }
}

const deleteTask = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id)
    res.status(200).json(deletedTask)
  } catch (e) {
    res.status(400).json(e)
  }
}

export { createTask, deleteTask, getAllTasks, getTask, updateTask }
