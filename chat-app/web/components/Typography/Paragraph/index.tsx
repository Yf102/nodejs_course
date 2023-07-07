import cn from 'classnames'
import React from 'react'

type ParagraphProps = {
  children: React.ReactNode
  className?: string
}

const Paragraph = ({ className, children }: ParagraphProps) => {
  return (
    <p
      className={cn(
        'leading-snug opacity-90	',
        {
          'mb-6':
            !className ||
            (className.indexOf('mb-') === -1 &&
              className.indexOf('my-') === -1),
        },
        className
      )}
    >
      {children}
    </p>
  )
}

export default Paragraph
