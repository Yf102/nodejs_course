import cn from 'classnames'
import { RespType } from 'components/MessageForm'
import moment from 'moment/moment'
import { UserType } from 'types/User'
import styles from './TextMsg.module.scss'

type TextMsgType = {
  msg: RespType
}

const TextMsg = ({ msg }: TextMsgType) => {
  const location = msg.text?.split('{{location}}:')[1]

  const _msg = location ? (
    <a target='_blank' href={location}>
      New Location
    </a>
  ) : (
    msg.text
  )

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
        {_msg}
      </div>
    </>
  )
}

export default TextMsg
