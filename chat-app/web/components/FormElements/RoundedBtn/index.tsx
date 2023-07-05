import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from 'react'
import Image from 'next/image'
import cn from 'classnames'
import styles from './RoundedBtn.module.scss'

type BtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type BtnCustomProps = {
  src?: string
  alt?: string
  text?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  className?: string
  onClick?: () => void
}

const RoundedBtn = forwardRef<HTMLButtonElement, BtnProps & BtnCustomProps>(
  (props, ref) => {
    const { className, src, alt, text, onClick, type = 'submit' } = props
    return (
      <button
        data-testid='rounded-btn-element'
        type={type}
        ref={ref}
        className={cn(className, styles.sendBtn)}
        onClick={onClick}
      >
        {src && alt && <Image src={src} alt={alt} width={50} height={50} />}
        {text}
      </button>
    )
  }
)

RoundedBtn.displayName = 'Button'

export default RoundedBtn
