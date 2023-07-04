import Filter from 'bad-words'
import http from 'http'
import * as process from 'process'
import { Server } from 'socket.io'
import app from 'src/app'
import { generateMessage } from 'src/utils/messages'

const port = process.env.PORT

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_BASE_PATH,
    methods: ['GET', 'POST'],
  },
})

type CallbackType = (message?: string) => void
io.on('connection', (socket) => {
  console.log('client connected: ', socket.id)
  socket.on('disconnect', () =>
    io.emit('message', generateMessage('A user has left'))
  )

  // Send to everyone but current socket
  socket.broadcast.emit('message', generateMessage('A new user has joined!'))

  socket.on('sendMessage', (res, callback: CallbackType) => {
    const filter = new Filter()
    if (filter.isProfane(res)) {
      if (typeof callback === 'function') {
        return callback('Profanity is not allowed')
      } else {
        return
      }
    }

    io.emit('message', generateMessage(res))
    if (typeof callback === 'function') callback()
  })

  socket.on(
    'sendLocation',
    (res: { long: string; lat: string }, callback: CallbackType) => {
      socket.broadcast.emit(
        'receiveLocation',
        generateMessage(`https://google.com/maps?q=${res.lat},${res.long}`)
      )

      if (typeof callback === 'function') callback('Location shared!')
    }
  )
})

try {
  server.listen(port, () =>
    console.log(`🚀 Server ready at: http://localhost:${port}`)
  )
} catch (error) {
  console.error(error)
  process.exit(1)
}
