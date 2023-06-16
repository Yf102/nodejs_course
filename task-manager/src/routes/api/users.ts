import { Router } from "express";
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "src/controllers/userController";

const UserRouter = Router()
    .get('', getAllUsers)
    .get("/:id", getUser)
    .post('/', createUser)
    .put("/:id", updateUser)
    .delete("/:id", deleteUser);

export default UserRouter