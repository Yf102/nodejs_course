import express from 'express'
import { json } from 'body-parser'

const app = express()
const port = process.env.port || 3000
app.use(json())

app.listen (port, () => {
    console.log( `server is listening on port ${port}`)
})