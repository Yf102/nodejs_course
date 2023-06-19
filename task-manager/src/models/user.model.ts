import crypto from 'crypto'
import { Document, model, Schema } from 'mongoose'
import validator from 'validator'

interface UserType {
  name: string
  email: string
  age: number
}
interface IUser extends UserType, Document {
  hash: string
  salt: string
  setPassword: (password: string) => void
  validPassword: (password: string) => boolean
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
})

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

// Method to check the entered password is correct or not
// valid password method checks whether the user
// password is correct or not
// It takes the user password from the request
// and salt from user database entry
// It then hashes user password and salt
// then checks if this generated hash is equal
// to user's hash in the database or not
// If the user's hash is equal to generated hash
// then the password is correct otherwise not
UserSchema.methods.validPassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`)
  return this.hash === hash
}
const UserModel = model<IUser>('User', UserSchema)

export { IUser, UserModel, UserType }
