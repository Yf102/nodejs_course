import React from 'react'
import Input from 'components/FormElements/Input'
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { ContactsFormInput } from 'services/types/home'
import styles from './HomeForm.module.scss'
import cn from 'classnames'

type HomeFormType = {
  register: UseFormRegister<ContactsFormInput>
  onSubmit: SubmitHandler<ContactsFormInput>
  handleSubmit: UseFormHandleSubmit<ContactsFormInput>
  errors: {
    latitude?: FieldError | undefined
    longitude?: FieldError | undefined
  }
}

const HomeForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}: HomeFormType) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center mb-10'
    >
      <Input
        placeholder='42.6665921'
        label='Latitude'
        {...register('latitude')}
        error={errors.latitude}
      />
      <Input
        placeholder='23.351723'
        label='Longitude'
        {...register('longitude')}
        error={errors.longitude}
      />
      <button
        type='submit'
        className={cn(
          styles['button-class'],
          styles['button-primary'],
          'rounded-md px-4 py-1'
        )}
      >
        Get partners
      </button>
    </form>
  )
}

export default HomeForm
