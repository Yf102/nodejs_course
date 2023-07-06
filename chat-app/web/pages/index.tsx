import Input from 'components/FormElements/Input'
import { useRef } from 'react'
import styles from 'styles/Index.module.scss'

const Index = () => {
  const userNameRef = useRef<HTMLInputElement>(null)
  const roomRef = useRef<HTMLInputElement>(null)
  return (
    <div className='mx-auto flex max-w-sm flex-col'>
      <h1 className='mb-10 text-3xl font-bold'>Join</h1>
      <form className=' flex flex-col items-center' action='/chat'>
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
