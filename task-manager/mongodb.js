import {MongoClient, ObjectId} from 'mongodb'

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

const client = new MongoClient(connectionUrl)
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    // await collection.insertOne({desc: 'Go on a date', completed: false})

    // await collection.updateMany({completed: false}, {$set: {completed: true}})
    // await collection.updateOne({name: 'Tsvetan'}, {$set: { age: 29}})
    // await collection.updateMany({age: 33}, {$set: {age: 32}})

    // await collection.deleteOne({desc: 'Go on a date'})
    await collection.deleteMany({completed: true})

    return 'done...'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());