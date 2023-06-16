/* eslint-disable no-console */
import mongoose from 'mongoose'
const dbName = 'task-manager-api'
const connectionUrl = `mongodb://127.0.0.1:27017/${dbName}`

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
