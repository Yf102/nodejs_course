import 'whatwg-fetch'
import { setupServer } from 'msw/node'
import { handlers } from 'tests/handlers'

jest.mock('next/router', () => require('next-router-mock'))

const noop = () => ''
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })

export const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())
