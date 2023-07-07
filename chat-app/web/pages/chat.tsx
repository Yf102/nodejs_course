import MessageForm, { RespType } from 'components/MessageForm'
import TextMsg from 'components/TextMsg'
import useSearchParams from 'hooks/useSearchParms'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from 'store/slices/modalSlice'
import {
  default as styles,
  default as stylesIndex,
} from 'styles/Index.module.scss'
const Home = ({}) => {
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])
  const refScroll = useRef<HTMLDivElement>(null)
  const params = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight
    }
  }, [receivedMessage])

  const showUsers = () => {
    dispatch(showModal('users-modal'))
  }

  return (
    <div data-testid='home-element' className={styles.container}>
      <div onClick={showUsers} className={stylesIndex['room-header']}>
        {params?.room}
      </div>
      <div ref={refScroll} className={stylesIndex['messages-form']}>
        {receivedMessage.map((msg, index) => {
          return <TextMsg msg={msg} key={index} />
        })}
      </div>

      <MessageForm onChange={(respMsg) => setReceivedMessage(respMsg)} />
    </div>
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
