import mongoose from "mongoose"
import {IUser, UserModel, UserType} from "../models/user.model";
import {type} from "os";
import {ITask, TaskModel, TaskType} from "../models/task.model";

const dbName = 'task-manager-api'
const connectionUrl = `mongodb://127.0.0.1:27017/${dbName}`

const main = async () =>
    await mongoose.connect(connectionUrl)

export default main

// main()
//     .then((resp) => console.log(resp))
//     .catch(err => console.log(err))
// .finally(() => mongoose.disconnect());