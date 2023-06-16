import { Document, Schema, model } from 'mongoose'

interface TaskType {
  description: string
  completed?: boolean
}
interface ITask extends TaskType, Document {}

const TaskSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    required: true,
    type: Boolean,
    default: false,
  },
})

const TaskModel = model<ITask>('Task', TaskSchema)

export { ITask, TaskModel, TaskType }
