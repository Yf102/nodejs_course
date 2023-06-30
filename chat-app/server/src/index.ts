import http from 'http'
import * as process from 'process'
import { Server } from 'socket.io'
import app from 'src/app'

const port = process.env.PORT

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_BASE_PATH,
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('client connected: ', socket.id)
  socket.on('disconnect', (reason) => console.log(reason))

  socket.on('message', (res) => io.emit('message', res))
})

try {
  server.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}`)
  )
} catch (error) {
  console.error(error)
  process.exit(1)
}
