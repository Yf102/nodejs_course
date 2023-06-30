import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const basePath = process.env?.API
  ? process.env.API
  : process.env.NEXT_PUBLIC_BASE_PATH

const baseQuery = fetchBaseQuery({
  baseUrl: basePath + '/api/',
})

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: 900,
  tagTypes: [],
  endpoints: () => ({}),
})

export { api }
