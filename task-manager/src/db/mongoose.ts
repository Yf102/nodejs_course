import mongoose from 'mongoose'

const Database = async () => {
  console.log(`CONNECTING TO ${process.env.MONGODB_URL}`)
  mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => console.log('✔️ Connection successful: MongoDB Atlas'))
    .catch((err) => {
      console.log('❌ Connection failed: MongoDB Atlas')
      console.error(err)
    })
}

export default Database
