import React from 'react'
import { twMerge } from 'tailwind-merge'

import styles from './Heading.module.scss'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingProps = {
  id?: string
  className?: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  fontWeight?: 'normal' | 'bold'
  children?: React.ReactNode
  extraAttributes?: { [key: string]: string | number | boolean }
  style?: React.CSSProperties
}

/**
 * Creates a heading tag (`<h1>`, `<h2>`, etc.).
 */
const Heading = ({
  id,
  className,
  level = 1,
  children,
  style,
  ...extraAttributes
}: HeadingProps) => {
  const H = `h${level}` as HeadingTag

  const sizeMap = {
    1: 'text-3xl sm:text-4xl mb-5 font-semibold uppercase text-center',
    2: 'text-2xl sm:text-3xl mb-4 font-semibold',
    3: 'text-xl sm:text-2xl mb-3 font-semibold',
    4: 'text-base sm:text-xl mb-2 font-semibold',
    5: 'text-sm sm:text-lg font-semibold mb-1',
    6: 'text-xs sm:text-sm font-semibold',
  }

  const classes = twMerge(styles.root, sizeMap[level], className)

  return (
    <H id={id} style={style} className={classes} {...extraAttributes}>
      {children}
    </H>
  )
}

export default Heading
