import { ParseGetAllQueryType } from 'src/routes/api/tasks'

const DigitsReg = new RegExp(/^\d+$/)
const parseGetAllQuery = (query: ParseGetAllQueryType) => {
  const { completed, limit, skip } = query
  const parsedOptions: { skip: number; limit: number } = {
    skip: 0,
    limit: 10,
  }
  const parsedMatch: { completed?: boolean } = {}

  if (completed) {
    parsedMatch.completed = completed === 'true'
  }

  if (DigitsReg.test(skip || '') && skip) {
    parsedOptions.skip = parseInt(skip)
  }

  if (DigitsReg.test(limit || '') && limit) {
    const _limit = parseInt(limit)
    if (_limit < 50) {
      parsedOptions.limit = _limit
    }
  }

  return { options: parsedOptions, match: parsedMatch }
}

export { parseGetAllQuery }
