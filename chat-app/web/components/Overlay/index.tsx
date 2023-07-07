import { useCallback, useEffect } from 'react'
import styles from './Overlay.module.scss'

type OverlayType = {
  onClick?: () => void
  visible: boolean | null
  scroll?: boolean
}

const Overlay = ({ onClick, visible, scroll = true }: OverlayType) => {
  const disableScroll = useCallback(
    (disabled: boolean | null) => {
      const html = document.querySelectorAll('html')[0]
      html.classList.toggle('overflow-hidden', disabled ? scroll : false)
    },
    [scroll]
  )

  useEffect(() => {
    disableScroll(visible)
  }, [visible, disableScroll])

  return <>{visible && <div className={styles.root} onClick={onClick} />}</>
}

export default Overlay
