import dotenv from 'dotenv'
import express from 'express'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app = express()
app.use(express.json())

export default app
