import cn from 'classnames'
import styles from 'components/Modal/Modal.module.scss'
import Overlay from 'components/Overlay'
import { Heading } from 'components/Typography'
import Paragraph from 'components/Typography/Paragraph'
import useOnClickOutside from 'hooks/useClickOutside'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, selectTargetModals } from 'store/slices/modalSlice'
import { getBreakpointValue } from 'utils/tailwindHelper'

type ModalProps = {
  targetModal: string
  children: JSX.Element
  allowClickOutside?: boolean
  allowClose?: boolean
  hideCloseBtn?: boolean
  className?: string
  classesWrapper?: string
  onClose?: (target: string) => void
  scroll?: boolean
  responsive?: boolean
  wrapperId?: string
  heading?: string | JSX.Element
  subHeading?: string | JSX.Element
  textSection?: string | JSX.Element
}

const Modal = ({
  targetModal,
  children,
  allowClickOutside = true,
  allowClose = true,
  hideCloseBtn = false,
  className = '',
  classesWrapper = '',
  onClose,
  scroll = true,
  responsive = false,
  wrapperId = 'app-main',
  heading,
  subHeading,
  textSection,
}: ModalProps) => {
  const dispatch = useDispatch()
  const [wrapper, setWrapper] = useState<Element | null>(null)
  const windowSize = useWindowSize()
  const maxWidth = getBreakpointValue('xs')
  const animation = useMemo(() => {
    if (responsive && windowSize.width <= maxWidth) {
      return 'slide-bottom'
    } else {
      return 'scale'
    }
  }, [responsive, windowSize, maxWidth])

  const selector = useSelector(selectTargetModals)
  const selectedModal = selector.targetModals.find(
    (i) => i.modalName === targetModal
  )
  const display = selectedModal && selectedModal.visible ? 'flex' : 'hidden'

  useEffect(() => {
    let element = document.getElementById(wrapperId)
    // Bool flag whether container-element has been created.
    let created = false
    if (!element) {
      created = true
      const wrapper = document.createElement('div')
      wrapper.setAttribute('id', wrapperId)
      document.body.appendChild(wrapper)
      element = wrapper
    }
    // Set wrapper state.
    setWrapper(element)
    // Cleanup effect.
    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    allowClose && allowClickOutside && selectedModal?.visible
      ? closeEvent()
      : null
  })

  if (wrapper === null) return null

  const closeEvent = () => {
    if (onClose) {
      onClose(targetModal)
    }
    dispatch(closeModal(targetModal))
  }

  return ReactDOM.createPortal(
    <>
      <div
        id={targetModal}
        aria-hidden='true'
        className={cn(
          styles.root,
          { 'items-center': !responsive || windowSize.width > maxWidth },
          { 'items-end': responsive && windowSize.width <= maxWidth },
          `h-modal fixed bottom-0 left-0 right-0 top-0 justify-center overflow-x-hidden overflow-y-hidden md:inset-0 md:h-full ${display}`,
          classesWrapper
        )}
        role='dialog'
      >
        <Overlay scroll={scroll} visible={!!selectedModal?.visible} />
        {selectedModal?.visible}
        <div
          className={cn(
            styles.content,
            {
              [styles.slideAnimation]:
                selectedModal?.visible && animation === 'slide-bottom',
              ['animate-in zoom-in-50']:
                selectedModal?.visible && animation === 'scale',
            },
            className
          )}
        >
          {allowClose && !hideCloseBtn && (
            <button
              aria-label='close'
              type='button'
              className={`${styles.modalClose} ml-auto inline-flex items-center rounded-full p-1.5 text-sm`}
              onClick={closeEvent}
            >
              <MdOutlineClose size='28px' />
            </button>
          )}

          {selectedModal?.visible && (
            <>
              {(heading || subHeading || textSection) && (
                <div className='mx-auto max-w-[19.5rem] sm:max-w-[24rem]'>
                  {(heading || subHeading) && (
                    <div className='mb-4'>
                      {heading && (
                        <Heading level={2} className='uppercase'>
                          {heading}
                        </Heading>
                      )}
                      {subHeading && <Heading level={4}>{subHeading}</Heading>}
                    </div>
                  )}
                  {textSection && <Paragraph>{textSection}</Paragraph>}
                </div>
              )}

              <div ref={ref} className={styles.scrollableContent}>
                {children}
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById(wrapperId) || document.body
  )
}

export default Modal
