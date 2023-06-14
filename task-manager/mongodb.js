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

    // const foundResult = await collection.findOne({ name: 'Go dancing at 19:30' });
    // console.log(foundResult._id.getTimestamp(), foundResult)

    // const lastTask = await collection.findOne()
    // console.log('lastTask', lastTask)

    return 'done...'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());