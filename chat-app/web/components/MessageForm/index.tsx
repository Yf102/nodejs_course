import React, { useEffect, useRef, useState } from 'react'
import Input from 'components/FormElements/Input'
import styles from 'pages/index.module.scss'
import cn from 'classnames'
import stylesHF from 'components/MessageForm/MessageForm.module.scss'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

export type RespType = { text: string; createdAt: number }
type MessageFormType = { onChange?: (respMsg: RespType[]) => void }

const MessageForm = ({ onChange }: MessageFormType) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const inputRef = useRef<HTMLInputElement>(null)
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])

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
        return [...old, data]
      })
    })

    socket.on('receiveLocation', (data: RespType) => {
      setReceivedMessage((old) => {
        data.text = `{{location}}:${data.text}`
        return [...old, data]
      })
    })
  }, [socket])

  const [msgSending, setMsgSending] = useState(false)
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef?.current?.value) return
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
    <form className={styles['control-form']} onSubmit={sendMessage}>
      <Input type='text' ref={inputRef} />
      <div className='flex justify-between w-full'>
        <button
          type='button'
          disabled={msgSending}
          className={cn(
            stylesHF['button-class'],
            stylesHF['button-secondary-glow'],
            'rounded-md px-4'
          )}
          onClick={sendLocation}
        >
          Send Location
        </button>
        <button
          disabled={msgSending}
          type='submit'
          className={cn(
            stylesHF['button-class'],
            stylesHF['button-primary'],
            'rounded-md px-4'
          )}
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default MessageForm
