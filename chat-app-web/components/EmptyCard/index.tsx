import React from 'react'
import styles from '../PartnerCard/PartnerCard.module.scss'
import cn from 'classnames'

const EmptyCard = () => {
  return (
    <div
      data-testid='empty-card-element'
      className={cn(
        styles['light'],
        'col-span-12 col-start-1 text-center block rounded-lg px-8 py-10 my-4'
      )}
    >
      <h1 className='text-xl'>
        We could not find any partner less then 100km away!
      </h1>
    </div>
  )
}

export default EmptyCard
