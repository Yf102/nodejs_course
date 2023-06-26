import dotenv from 'dotenv'
import express from 'express'
import Database from 'src/db/mongoose'
import { errorMiddleware } from 'src/middleware/errorHandling'
import AuthRouter from 'src/routes/api/auth'
import TaskRouter from 'src/routes/api/tasks'
import UserRouter from 'src/routes/api/users'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const port = process.env.PORT

const app = express()
app.use(express.json())

app.use('/api', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/tasks', TaskRouter)

// Error handling middleware for all routes
app.use(errorMiddleware)

const start = async () => {
  try {
    await Database(process.env.MONGODB_URL || '')
    app.listen(port, () =>
      console.log(`🚀 Server ready at: http://localhost:${port}`)
    )
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()
