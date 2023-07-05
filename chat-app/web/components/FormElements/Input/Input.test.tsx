import React from 'react'
import { render, screen } from 'tests/test-utils'
import Input from 'components/FormElements/Input/index'

describe('Input', () => {
  it('It renders Input', async () => {
    const { asFragment } = render(<Input placeholder='23.351723' />)
    expect(screen.getByTestId('input-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
