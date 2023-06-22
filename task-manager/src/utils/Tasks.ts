import {
  allowedSorting,
  GetAllQueryType,
  ParsedMatchType,
  ParsedOptionsType,
} from 'src/@types/Tasks'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'

const DigitsReg = new RegExp(/^\d+$/)
const DEFAULT_SKIP = 0
const DEFAULT_LIMIT = 10
const MIN_LIMIT = 0
const MAX_LIMIT = 50

const parseGetAllQuery = (query: GetAllQueryType) => {
  const { completed, limit, skip, sort } = query
  const parsedOptions: ParsedOptionsType = {
    skip: DEFAULT_SKIP,
    limit: DEFAULT_LIMIT,
    sort: {},
  }

  const parsedMatch: ParsedMatchType = {}

  if (completed) {
    parsedMatch.completed = completed === 'true'
  }

  if (DigitsReg.test(skip || '') && skip) {
    const _skip = parseInt(skip)
    if (0 < _skip) {
      parsedOptions.skip = parseInt(skip)
    }
  }

  if (DigitsReg.test(limit || '') && limit) {
    const _limit = parseInt(limit)
    if (MIN_LIMIT < _limit && _limit <= MAX_LIMIT) {
      parsedOptions.limit = _limit
    }
  }

  if (sort) {
    if (!allowedSorting.includes(sort)) {
      throw new CustomError(ServerError.InvalidSorting)
    }

    const _sort = sort.split(':')
    parsedOptions.sort[_sort[0]] = _sort[1] === 'desc' ? -1 : 1
  }

  return { options: parsedOptions, match: parsedMatch }
}

export { parseGetAllQuery }
