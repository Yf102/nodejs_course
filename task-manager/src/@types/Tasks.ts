export const allowedSorting = ['createdAt:desc', 'createdAt:asc'] as const
type AllowedSortingType = (typeof allowedSorting)[number]

export type GetAllQueryType = {
  completed?: 'true' | 'false'
  limit?: string
  skip?: string
  sort?: AllowedSortingType
}

export type ParsedOptionsType = {
  limit: number
  skip: number
  sort: Record<string, number>
}

export type ParsedMatchType = {
  completed?: boolean
}
