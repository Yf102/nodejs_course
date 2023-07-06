import Input from 'components/FormElements/Input/index'
import { render, screen } from 'tests/test-utils'

describe('Input', () => {
  it('It renders Input', async () => {
    const { asFragment } = render(<Input placeholder='23.351723' />)
    expect(screen.getByTestId('input-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
