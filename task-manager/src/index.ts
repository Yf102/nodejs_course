import express, {Request} from 'express'
import mongooseConnect from './db/mongoose'
import {IUser, UserModel, UserType} from "./models/user.model";
import mongoose from "mongoose";

const app = express()
const port = process.env.port || 3000
app.use(express.json())


app.get("/users", async (req, res) => {
    await UserModel.find().then((allUsers) => {
        res.status(200).json(allUsers)
    }).catch((e) => {
        res.status(400).json(e)
    })

});

app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    await UserModel.findById(id).then((user) => {
        res.status(200).json(user)
    }).catch((e) => {
        res.status(400).json(e)
    })
});

app.post('/users', async (req: Request<{}, {}, UserType>, res) => {
    const newUser: IUser = new UserModel<UserType>({ ...req.body })
    await newUser.save().then((insertedUser) => {
        res.status(201).json(insertedUser)
    }).catch((e) => {
        res.status(400).json(e)
    })
})

app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    await UserModel.updateOne({ id }, req.body)
    await UserModel.findById(id).then((updatedUser) => {
        res.status(200).json(updatedUser)
    }).catch((e) => {
        res.status(400).json(e)
    });
});

app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id).then((deletedUser) => {
        res.status(200).json(deletedUser)
    }).catch((e) => {
        res.status(400).json(e)
    })
});

const start = async () => {
    try {
        await mongooseConnect()
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            // .finally(() => mongoose.disconnect())

        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
start()