import React from 'react'
import { render, screen } from 'tests/test-utils'

import PartnerCard from 'components/PartnerCard/index'
import { SinglePartner } from 'tests/__mocks__/data/Partners'

describe('PartnerCard', () => {
  it('It renders PartnerCard', async () => {
    const { asFragment } = render(
      <PartnerCard
        id={SinglePartner.id}
        name={SinglePartner.name}
        distance={SinglePartner.distance}
      />
    )
    expect(screen.getByTestId('partner-card-element')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
