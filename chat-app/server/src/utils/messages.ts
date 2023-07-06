import { UserType } from 'src/utils/users'

const generateMessage = (
  text: string,
  user: UserType & { sender?: 'server' }
) => {
  return {
    text,
    user,
    createdAt: new Date().getTime(),
  }
}

export { generateMessage }
