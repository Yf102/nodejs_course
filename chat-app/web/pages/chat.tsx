import MessageForm, { RespType } from 'components/MessageForm'
import TextMsg from 'components/TextMsg'
import { useState } from 'react'
import {
  default as styles,
  default as stylesIndex,
} from 'styles/Index.module.scss'
const Home = ({}) => {
  const [receivedMessage, setReceivedMessage] = useState<RespType[]>([])
  return (
    <div data-testid='home-element' className={styles.container}>
      <div className={stylesIndex['messages-form']}>
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
