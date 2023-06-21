import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Document, Model, model, Schema } from 'mongoose'
import * as process from 'process'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'
import validator from 'validator'

interface UserType {
  name: string
  email: string
  age: number
  tokens: { token: string }[]
}

interface IUser extends UserType, Document {
  hash: string
  salt: string
  setPassword: (password: string) => void
  validPassword: (password: string) => boolean
  generateAuthToken: () => string
}
interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser | null>
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hash: {
    required: true,
    type: String,
  },
  salt: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Email must be valid.')
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error('Age must be apositive number')
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

UserSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new CustomError(ServerError.InvalidCredentials)
  }

  // Perform password comparison or any other logic to verify credentials
  const isMatch = user.validPassword(password)
  if (!isMatch) {
    throw new CustomError(ServerError.InvalidCredentials)
  }

  return user
}

// Method to set salt and hash the password for a user
// setPassword method first creates a salt unique for every user
// then it hashes the salt with user password and creates a hash
// this hash is stored in the database as user password
UserSchema.methods.setPassword = function (password: string) {
  if (!password) {
    return
  }

  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex')

  // Hashing user's salt and password with 1000 iterations,
  // 64 length and sha512 digest
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`)
}

UserSchema.methods.validPassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`)
  return this.hash === hash
}

UserSchema.methods.generateAuthToken = async function () {
  if (!process.env.JWT_SECRET) {
    throw new CustomError(ServerError.InternalServerError)
  }

  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
  this.tokens = this.tokens.concat({ token })
  await this.save()

  return token
}

UserSchema.methods.toJSON = function () {
  const userObj = this.toObject()
  delete userObj.hash
  delete userObj.salt
  delete userObj.tokens

  return userObj
}

const UserModel = model<IUser, IUserModel>('User', UserSchema)

export { IUser, UserModel, UserType }
