import React from 'react'
import { render, screen } from 'tests/test-utils'
import EmptyCard from 'components/EmptyCard/index'

describe('EmptyCard', () => {
  it('It renders EmptyCard', async () => {
    const { asFragment } = render(<EmptyCard />)
    expect(screen.getByTestId('empty-card-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
