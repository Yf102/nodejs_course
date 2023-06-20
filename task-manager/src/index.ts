/* eslint-disable no-console */
import TaskRouter from '@/routes/api/tasks'
import dotenv from 'dotenv'
import express from 'express'
import Database from 'src/db/mongoose'
import UserRouter from 'src/routes/api/users'

dotenv.config()
const port = process.env.port || 3000

const app = express()
app.use(express.json())

app.use('/api/users', UserRouter)
app.use('/api/tasks', TaskRouter)

const start = async () => {
  try {
    await Database()
    app.listen(port, () =>
      console.log(`🚀 Server ready at: http://localhost:${port}`)
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()
