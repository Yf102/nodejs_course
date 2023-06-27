import mongoose from 'mongoose'

const Database = async () => {
  try {
    console.log(`CONNECTING TO ${process.env.MONGODB_URL}`)
    await mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log('✔️ Connection successful: MongoDB Atlas')
  } catch (err) {
    console.log('❌ Connection failed: MongoDB Atlas')
    console.error(err)
  }
}

export default Database
