import { rest } from 'msw'
import { Partners } from 'tests/__mocks__/data/Partners'

export const handlers = [
  rest.options('http://localhost:3000/api/*', (_req, res, ctx) => {
    return res(ctx.json({}))
  }),
  rest.get('http://localhost:3000/api/partners', (_req, res, ctx) => {
    return res(ctx.json(Partners), ctx.delay(50))
  }),
]
