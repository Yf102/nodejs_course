import mongoose from 'mongoose'
import * as process from 'process'
const dbName = 'task-manager-api'
const mongoDB = process.env.DEV ? '127.0.0.1' : 'mongo'

console.log(`CONNECTING TO ${mongoDB}`)
const connectionUrl = `mongodb://${mongoDB}:27017/${dbName}`

const Database = async () => {
  mongoose
    .connect(connectionUrl)
    .then(() => console.log('✔️ Connection successful: MongoDB Atlas'))
    .catch((err) => {
      console.log('❌ Connection failed: MongoDB Atlas')
      console.error(err)
    })
}

export default Database
