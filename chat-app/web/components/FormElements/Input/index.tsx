import React from 'react'
import styles from './Input.module.scss'
import cn from 'classnames'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputCustomProps = {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps & InputCustomProps>(
  (props, ref) => {
    const { className } = props

    return (
      <input
        ref={ref}
        {...props}
        className={cn(styles['input-style'], className)}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
