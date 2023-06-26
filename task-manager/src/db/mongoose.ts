import mongoose from 'mongoose'
const dbName = 'task-manager-api'

const Database = async () => {
  console.log(`CONNECTING TO ${process.env.MONGODB_URL}/${dbName}`)
  mongoose
    .connect(`${process.env.MONGODB_URL}/${dbName}`)
    .then(() => console.log('✔️ Connection successful: MongoDB Atlas'))
    .catch((err) => {
      console.log('❌ Connection failed: MongoDB Atlas')
      console.error(err)
    })
}

export default Database
