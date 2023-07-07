import { render } from '@testing-library/react'
import Heading from './'

it('renders correctly with all props', () => {
  const { asFragment } = render(
    <Heading
      id='1234'
      level={1}
      aria-label='test heading'
      data-test='test data'
    >
      Heading level 1
    </Heading>
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders correctly without optional props', () => {
  const { asFragment } = render(<Heading level={2}>Heading level 2</Heading>)

  expect(asFragment()).toMatchSnapshot()
})
