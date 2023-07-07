import { DefaultEventsMap } from '@socket.io/component-emitter'
import Input from 'components/FormElements/Input'
import RoundedBtn from 'components/FormElements/RoundedBtn'
import UsersModal from 'components/MessageForm/Modal/UsersModal'
import useSearchParams from 'hooks/useSearchParms'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import styles from 'styles/Index.module.scss'
import { UserType } from 'types/User'

export type RespType = {
  user: UserType
  text: string
  createdAt: number
  isLocation?: boolean
}
type MessageFormType = { onChange?: (respMsg: RespType[]) => void }

const MessageForm = ({ onChange }: MessageFormType) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const inputRef = useRef<HTMLInputElement>(null)
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])
  const params = useSearchParams()
  const router = useRouter()
  const [hasJoined, setHasJoined] = useState(false)
  const myId = useRef<string>()
  const [roomUsers, setRoomUsers] = useState<UserType[]>([])
  useEffect(() => {
    if (!socket) return
    if (!router) return
    if (params === null) return

    if (!params.room || !params.username) {
      router.push('/')
      return
    }

    if (!hasJoined) {
      setHasJoined(true)
      socket?.emit('joinRoom', params, (error: string, userId: string) => {
        if (error) {
          console.log('Join Error', error)
          router.push('/')
        } else if (userId) {
          myId.current = userId
        }
      })
    }
  }, [hasJoined, params, router, socket])

  useEffect(
    () => onChange && onChange(receivedMessage),
    [onChange, receivedMessage]
  )

  useEffect(() => {
    setSocket(io(process.env.NEXT_PUBLIC_API || ''))
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => console.log('Connection id', socket.id))

    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })

    socket.on('disconnect', () => console.log('server disconnected'))

    socket.on('message', (data: RespType) => {
      setReceivedMessage((old) => {
        if (!data.user.sender) {
          if (data.user.id === myId.current) {
            data.user.sender = 'me'
          } else {
            data.user.sender = 'they'
          }
        }

        return [...old, data]
      })
    })

    socket.on('receiveLocation', (data: RespType) => {
      setReceivedMessage((old) => {
        data.isLocation = true
        if (!data.user.sender) {
          if (data.user.id === myId.current) {
            data.user.sender = 'me'
          } else {
            data.user.sender = 'they'
          }
        }

        return [...old, data]
      })
    })

    socket.on(
      'roomData',
      ({ room, users }: { room: string; users: UserType[] }) => {
        setRoomUsers(users)
      }
    )
  }, [socket])

  const [msgSending, setMsgSending] = useState(false)
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef?.current?.value.trim()) return
    setMsgSending(true)

    socket?.emit('sendMessage', inputRef?.current?.value, () => {
      setMsgSending(false)
    })

    if (inputRef?.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  const sendLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.')
    }

    setMsgSending(true)
    navigator.geolocation.getCurrentPosition((position) => {
      socket?.emit(
        'sendLocation',
        {
          long: position.coords.longitude,
          lat: position.coords.latitude,
        },
        () => setMsgSending(false)
      )
    })
  }

  return (
    <>
      <form className={styles['control-form']} onSubmit={sendMessage}>
        <div className='flex w-full justify-between'>
          <RoundedBtn
            onClick={sendLocation}
            className='px-4'
            type='button'
            src='/icons/location_icon.png'
            disabled={msgSending}
            alt='Send Img'
          />
          <Input type='text' ref={inputRef} />
          <RoundedBtn
            className={'pl-4 pr-2.5'}
            type='submit'
            src='/icons/send_icon.png'
            disabled={msgSending}
            alt='Send Img'
          />
        </div>
      </form>
      <UsersModal users={roomUsers} />
    </>
  )
}

export default MessageForm
