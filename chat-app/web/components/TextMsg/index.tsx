import cn from 'classnames'
import { RespType } from 'components/MessageForm'
import moment from 'moment/moment'
import { UserType } from 'types/User'
import styles from './TextMsg.module.scss'

type TextMsgType = {
  msg: RespType
}

const TextMsg = ({ msg }: TextMsgType) => {
  const header = (createdAt: number, user: UserType) => {
    return (
      <div
        className={cn({
          'text-right': user.sender === 'they',
        })}
      >
        <span className='font-bold'>{user.username}</span>
        <span className='ml-5 opacity-70'>
          {moment(createdAt).format('HH:mm')}
        </span>
      </div>
    )
  }

  return (
    <>
      <div
        id={msg.user.id}
        className={cn(
          {
            'self-end': msg.user.sender === 'they',
            'mx-auto opacity-50': msg.user.sender === 'server',
          },
          'mb-5 flex w-fit flex-col',
          styles.wrapper
        )}
      >
        {header(msg.createdAt, msg.user)}
        {msg.isLocation ? (
          <a target='_blank' href={msg.text}>
            New Location
          </a>
        ) : (
          msg.text
        )}
      </div>
    </>
  )
}

export default TextMsg
