import styles from '../styles/Home.module.scss'
import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
const Home = ({}) => {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API || '')
    socket.on('connect', () => console.log('Connection id', socket.id))

    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })

    socket.on('countUpdated', (data) =>
      console.log(`Count has been update ${data}`)
    )

    socket.on('disconnect', () => console.log('server disconnected'))
  }, [])

  return (
    <>
      <div data-testid='home-element' className={styles.container}>
        <div className='grid grid-cols-12 auto-rows-max mx-auto max-w-3xl'>
          <div className='col-span-12 px-3 md:px-6' />
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
