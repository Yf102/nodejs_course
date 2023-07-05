import { rest } from 'msw'

export const handlers = [
  rest.options('http://localhost:3000/api/*', (_req, res, ctx) => {
    return res(ctx.json({}))
  }),
]
