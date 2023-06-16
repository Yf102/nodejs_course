import mongoose from "mongoose"
const dbName = 'task-manager-api'
const connectionUrl = `mongodb://127.0.0.1:27017/${dbName}`

// const main = async () =>
//     await mongoose.connect(connectionUrl)
//
// export default main

// main()
//     .then((resp) => console.log(resp))
//     .catch(err => console.log(err))
// .finally(() => mongoose.disconnect());



const Database = async () => {
    mongoose
        .connect(connectionUrl!)
        .then(() => console.log('✔️ Connection successful: MongoDB Atlas'))
        .catch(err => {
            console.log('❌ Connection failed: MongoDB Atlas')
            console.error(err)
        })
}

export default Database