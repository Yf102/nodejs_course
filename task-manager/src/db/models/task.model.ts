import { Document, Schema, model } from 'mongoose'
import { Models } from 'src/const/models'

const {
  Types: { ObjectId },
} = Schema

interface TaskType {
  description: string
  completed?: boolean
  owner?: string
  createdAt: Date
  updateAt: Date
}
interface ITask extends TaskType, Document {}

const TaskSchema: Schema = new Schema(
  {
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
    owner: {
      type: ObjectId,
      require: true,
      ref: Models.USER,
    },
  },
  {
    timestamps: true,
  }
)

const TaskModel = model<ITask>(Models.TASK, TaskSchema)

export { ITask, TaskModel, TaskType }
