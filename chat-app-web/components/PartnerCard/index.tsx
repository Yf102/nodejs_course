import React from 'react'
import { PartnerCardType } from 'services/types/partners'
import styles from './PartnerCard.module.scss'
import cn from 'classnames'
import Icon from 'components/Icon'

const PartnerCard = (p: PartnerCardType) => {
  return (
    <div
      data-testid='partner-card-element'
      className={cn(
        styles['light'],
        'col-span-12 col-start-1 text-center block rounded-lg px-8 py-10 mb-4'
      )}
    >
      <Icon className='opacity-30' width={42} height={42} icon={'icon_user'} />
      <div className={styles.paragraph}>{p.id}</div>
      <h1 className='text-xl'>{p.name}</h1>
      <div className={cn(styles.paragraph, 'mb-0')}>
        {Number(p.distance.toFixed(3))} km
      </div>
    </div>
  )
}

export default PartnerCard
