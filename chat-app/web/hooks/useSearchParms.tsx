import { useEffect, useState } from 'react'

type SearchType = {
  username?: string
  room?: string
}

const useSearchParams = () => {
  const [queryParams, setQueryParams] = useState<SearchType | null>(null)

  useEffect(() => {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)

    const paramsObject: { username?: string; room?: string } = {}

    searchParams.forEach((value, key) => {
      if (key === 'username' || key === 'room') {
        paramsObject[key] = value
      }
    })

    setQueryParams(paramsObject)
  }, [])

  return queryParams
}

export default useSearchParams
