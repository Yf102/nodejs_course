import styles from '../styles/Home.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import stylesHF from '../components/HomeForm/HomeForm.module.scss'
import Input from 'components/FormElements/Input'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import moment from 'moment'

type RespType = { text: string; createdAt: number }
const Home = ({}) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const inputRef = useRef<HTMLInputElement>(null)
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])

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
    setMsgSending(true)

    socket?.emit('sendMessage', inputRef?.current?.value, (error?: string) => {
      setMsgSending(false)
      if (error) return console.log(error)

      console.log('Message Delivered')
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
      // https://google.com/maps?q=42.69724254741613,23.352732746442026
      socket?.emit(
        'sendLocation',
        {
          long: position.coords.longitude,
          lat: position.coords.latitude,
        },
        (message?: string) => {
          console.log(message)
          setMsgSending(false)
        }
      )
    })
  }

  return (
    <>
      <div data-testid='home-element' className={styles.container}>
        <div className='grid grid-cols-12 auto-rows-max mx-auto max-w-3xl'>
          <div className='col-span-12 px-3 md:px-6 mt-10'>
            <form
              className='flex flex-col items-center justify-center'
              onSubmit={sendMessage}
            >
              <div className='mb-10 uppercase text-3xl'>Chat App</div>
              <Input type='text' className='w-80' ref={inputRef} />
              <button
                disabled={msgSending}
                type='submit'
                className={cn(
                  stylesHF['button-class'],
                  stylesHF['button-primary'],
                  'rounded-md px-4 py-1 mb-10'
                )}
              >
                Send Message
              </button>
              <button
                disabled={msgSending}
                className={cn(
                  stylesHF['button-class'],
                  stylesHF['button-secondary-glow'],
                  'rounded-md px-4 py-1 mb-10'
                )}
                onClick={sendLocation}
              >
                Send Location
              </button>
            </form>

            <div className='flex flex-col items-center'>
              {receivedMessage.map((msg, index) => {
                const location = msg.text?.split('{{location}}:')[1]
                if (location) {
                  return (
                    <a key={index} target='_blank' href={location}>
                      New Location
                    </a>
                  )
                }
                return (
                  <div key={index}>
                    {moment(msg.createdAt).format('HH:mm')} - {msg.text}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

// For SSR (performance gain with pre-rendering the page)
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  }
}
