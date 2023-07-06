import { DefaultEventsMap } from '@socket.io/component-emitter'
import Input from 'components/FormElements/Input'
import RoundedBtn from 'components/FormElements/RoundedBtn'
import useSearchParams from 'hooks/useSearchParms'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import styles from 'styles/Index.module.scss'

export type RespType = { text: string; createdAt: number }
type MessageFormType = { onChange?: (respMsg: RespType[]) => void }

const MessageForm = ({ onChange }: MessageFormType) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const inputRef = useRef<HTMLInputElement>(null)
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])
  const params = useSearchParams()

  const router = useRouter()
  useEffect(() => {
    if (params !== null && (!params.room || !params.username)) {
      router.push('/')
    }
  }, [params, router])

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
          className={'pr-2.5 pl-4'}
          type='submit'
          src='/icons/send_icon.png'
          disabled={msgSending}
          alt='Send Img'
        />
      </div>
    </form>
  )
}

export default MessageForm
