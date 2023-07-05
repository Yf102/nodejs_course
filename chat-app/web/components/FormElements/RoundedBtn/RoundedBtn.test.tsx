import React from 'react'
import { render, screen } from 'tests/test-utils'
import RoundedBtn from 'components/FormElements/RoundedBtn/index'

describe('RoundedBtn', () => {
  it('It renders RoundedBtn with image', async () => {
    const { asFragment } = render(
      <RoundedBtn type='submit' src='/icons/send_icon.png' alt='Send Button' />
    )
    expect(screen.getByTestId('rounded-btn-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })

  it('It renders RoundedBtn with text', async () => {
    const { asFragment } = render(<RoundedBtn type='button' text='Send' />)
    expect(screen.getByTestId('rounded-btn-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
