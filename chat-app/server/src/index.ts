import Filter from 'bad-words'
import http from 'http'
import * as process from 'process'
import { Server } from 'socket.io'
import app from 'src/app'
import { generateMessage } from 'src/utils/messages'
import { addUser, getUser, removeUser } from 'src/utils/users'

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

  socket.on(
    'joinRoom',
    (
      { username, room }: { username: string; room: string },
      callback: CallbackType
    ) => {
      const { error, user } = addUser({ id: socket.id, username, room })
      if (error) {
        if (typeof callback === 'function') callback(error)
        return
      }

      if (!user) {
        if (typeof callback === 'function') callback(`Couldn't add user`)
        return
      }

      socket.join(user.room)

      // Send to everyone but current socket
      socket.broadcast
        .to(user.room)
        .emit('message', generateMessage(`Has joined.`, user.username))

      socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
          io.to(user.room).emit(
            'message',
            generateMessage(`Has left.`, user.username)
          )
        }
      })

      if (typeof callback === 'function') callback()
    }
  )

  socket.on('sendMessage', (res, callback: CallbackType) => {
    const filter = new Filter()
    if (filter.isProfane(res)) {
      if (typeof callback === 'function') {
        return callback('Profanity is not allowed')
      } else {
        return
      }
    }

    const user = getUser(socket.id)
    if (!user) return

    io.to(user.room).emit('message', generateMessage(res, user.username))
    if (typeof callback === 'function') callback()
  })

  socket.on(
    'sendLocation',
    (res: { long: string; lat: string }, callback: CallbackType) => {
      const user = getUser(socket.id)
      if (!user) return

      socket.broadcast
        .to(user.room)
        .emit(
          'receiveLocation',
          generateMessage(
            `https://google.com/maps?q=${res.lat},${res.long}`,
            user.username
          )
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
