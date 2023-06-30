import styles from '../styles/Home.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import stylesHF from '../components/HomeForm/HomeForm.module.scss'
import Input from 'components/FormElements/Input'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

const Home = ({}) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const inputRef = useRef<HTMLInputElement>(null)
  const [receivedMessage, setReceivedMessage] = useState<string[]>([])

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

    socket.on('message', (data: string) => {
      setReceivedMessage((old) => {
        return [...old, data]
      })
    })
  }, [socket])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket?.emit('message', inputRef?.current?.value)
    if (inputRef?.current) {
      inputRef.current.value = ''
    }
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
              <Input type='text' ref={inputRef} />
              <button
                type='submit'
                className={cn(
                  stylesHF['button-class'],
                  stylesHF['button-primary'],
                  'rounded-md px-4 py-1 mb-10'
                )}
              >
                Send Message
              </button>
            </form>

            <div className='flex flex-col items-center'>
              {receivedMessage.map((msg, index) => {
                return <div key={index}>{msg}</div>
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
