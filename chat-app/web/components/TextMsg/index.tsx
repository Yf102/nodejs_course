import cn from 'classnames'
import { RespType } from 'components/MessageForm'
import moment from 'moment/moment'
import styles from './TextMsg.module.scss'

type TextMsgType = { msg: RespType; type: 'mine' | 'theirs' | 'join' }

const TextMsg = ({ msg, type }: TextMsgType) => {
  const location = msg.text?.split('{{location}}:')[1]

  const _msg = location ? (
    <a target='_blank' href={location}>
      New Location
    </a>
  ) : (
    msg.text
  )

  const header = (createdAt: number) => {
    return (
      <div>
        {type !== 'join' && <span className='font-bold'>Some User</span>}
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
            'float-right': type === 'theirs',
            'mx-auto opacity-50': type === 'join',
          },
          'mb-5 flex w-fit flex-col',
          styles.wrapper
        )}
      >
        {header(msg.createdAt)}
        {_msg}
      </div>
    </>
  )
}

export default TextMsg
