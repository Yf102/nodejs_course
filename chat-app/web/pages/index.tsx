import styles from '../styles/Home.module.scss'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import cn from 'classnames'
import stylesHF from '../components/HomeForm/HomeForm.module.scss'
const Home = ({}) => {
  const socket = io(process.env.NEXT_PUBLIC_API || '')

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => console.log('Connection id', socket.id))

    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })

    socket.on('countUpdated', (data) =>
      console.log(`Count has been update ${data}`)
    )

    socket.on('disconnect', () => console.log('server disconnected'))
  }, [socket])

  const increment = () => {
    socket.emit('increment')
  }

  return (
    <>
      <div data-testid='home-element' className={styles.container}>
        <div className='grid grid-cols-12 auto-rows-max mx-auto max-w-3xl'>
          <div className='col-span-12 px-3 md:px-6 flex justify-center mt-10'>
            <button
              type='button'
              onClick={increment}
              className={cn(
                stylesHF['button-class'],
                stylesHF['button-primary'],
                'rounded-md px-4 py-1'
              )}
            >
              Increment by 1
            </button>
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
