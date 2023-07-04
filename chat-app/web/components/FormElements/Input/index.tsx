import React from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'
import cn from 'classnames'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputCustomProps = {
  label?: string
  error?: FieldError
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps & InputCustomProps>(
  (props, ref) => {
    const { label, error, className } = props

    return (
      <div className='pt-0 mb-3'>
        {label && <label data-testid='input-label-element'>{label}</label>}
        <input
          ref={ref}
          {...props}
          className={cn(
            className,
            'relative h-12 px-4 py-1 bg-white border-0 rounded-md outline-none focus:outline-none text-center text-xl text-black'
          )}
        />
        {error && <div className={styles.text}>{error.message}</div>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
