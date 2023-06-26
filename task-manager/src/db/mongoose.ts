import mongoose from 'mongoose'
const dbName = 'task-manager-api'

const Database = async (connectionUrl: string) => {
  console.log(`CONNECTING TO ${connectionUrl}/${dbName}`)
  mongoose
    .connect(`${connectionUrl}/${dbName}`)
    .then(() => console.log('✔️ Connection successful: MongoDB Atlas'))
    .catch((err) => {
      console.log('❌ Connection failed: MongoDB Atlas')
      console.error(err)
    })
}

export default Database
