import React from 'react'
import { render, screen } from 'tests/test-utils'
import Input from 'components/FormElements/Input/index'

describe('Input', () => {
  it('It renders Input with label', async () => {
    const { asFragment } = render(
      <Input label='Testing Label' placeholder='23.351723' />
    )
    expect(screen.getByTestId('input-label-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })

  it('It renders Input with NO label', async () => {
    const { asFragment } = render(<Input placeholder='23.351723' />)

    expect(screen.queryByTestId('input-label-element')).not.toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
