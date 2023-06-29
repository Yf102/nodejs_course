import { api } from 'services/index'
import { PartnerApiType } from 'services/types/partners'

const partnersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query<PartnerApiType, null>({
      query: () => '/partners',
    }),
  }),
})

export const { useGetPartnersQuery } = partnersApi

export const { getPartners } = partnersApi.endpoints

//SSR endpoints
export default partnersApi
