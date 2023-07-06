export type UserType = {
  id: string
  username: string
  room: string
  sender: 'me' | 'they' | 'server'
}
