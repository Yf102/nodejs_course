import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import cn from 'classnames'

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputCustomProps = {
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps & InputCustomProps>(
  (props, ref) => {
    const { className } = props

    return (
      <input
        data-testid='input-element'
        ref={ref}
        {...props}
        className={cn(styles['input-style'], className)}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
