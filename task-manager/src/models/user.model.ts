import {Document, model, Schema} from 'mongoose';
import validator from "validator";

interface UserType {
    name: string,
    password: string,
    email: string;
    age: number
}
interface IUser extends UserType, Document {}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        required: true,
        type: String,
        minLength: 7,
        trim: true,
        validate(value: string) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be password!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if(!validator.isEmail(value)) {
                throw new Error('Email must be valid.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value: number) {
            if(value < 0) {
                throw new Error('Age must be apositive number')
            }
        }
    }
})

const UserModel = model<IUser>('User', UserSchema);

export {
    IUser,
    UserType,
    UserModel
}