import React, { useRef } from 'react'
import Input from 'components/FormElements/Input'
import styles from 'styles/Index.module.scss'

const Index = () => {
  const userNameRef = useRef<HTMLInputElement>(null)
  const roomRef = useRef<HTMLInputElement>(null)
  return (
    <div className='flex flex-col max-w-sm mx-auto'>
      <h1 className='font-bold text-3xl mb-10'>Join</h1>
      <form className='flex flex-col items-center' action='/chat'>
        <label>Display Name</label>
        <Input
          name='username'
          type='text'
          ref={userNameRef}
          placeholder='Display Name'
          required
        />

        <label>Room</label>
        <Input
          type='text'
          name='room'
          ref={roomRef}
          placeholder='Room'
          required
        />

        <button className={styles['join-button']} type='submit'>
          Join
        </button>
      </form>
    </div>
  )
}

export default Index

// For SSR (performance gain with pre-rendering the page)
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  }
}
