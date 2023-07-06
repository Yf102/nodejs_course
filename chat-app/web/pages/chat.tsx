import MessageForm, { RespType } from 'components/MessageForm'
import TextMsg from 'components/TextMsg'
import { useEffect, useRef, useState } from 'react'
import {
  default as styles,
  default as stylesIndex,
} from 'styles/Index.module.scss'
const Home = ({}) => {
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])
  const refScroll = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight
    }
  }, [receivedMessage])

  return (
    <div data-testid='home-element' className={styles.container}>
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
