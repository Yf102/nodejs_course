import mongoose from "mongoose"
import {IUser, UserModel, UserType} from "./models/user.model";
import {type} from "os";
import {ITask, TaskModel, TaskType} from "./models/task.model";

const dbName = 'task-manager-api'
const connectionUrl = `mongodb://127.0.0.1:27017/${dbName}`

async function main() {
    await mongoose.connect(connectionUrl)

    // const desc: ITask = new TaskModel<TaskType>({
    //     description: 'Test',
    // })
    //
    // const _desc = await desc.save()
    // console.log('_desc', _desc)

    // const me: IUser = new UserModel<UserType>({
    //     name: 1,
    //     email: 'VLADI@Gmail',
    //     password: 'Test123',
    //     age: 18
    // })
    //
    // const _me = await me.save()
    // console.log(_me)

    return 'done...'
}

main()
    .then((resp) => console.log(resp))
    .catch(err => console.log(err))
    .finally(() => mongoose.disconnect());