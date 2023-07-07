import resolveConfig from 'tailwindcss/resolveConfig'
import conf from '../tailwind.config.js'

// @ts-ignore  any
export const tailwindConfig: any = resolveConfig(conf)

// sm, md, lg, xl, 2xl ...
export const getBreakpointValue = (value: string): number => {
  if (value === 'tall' || value === 'smallPhone' || value === 'narrow') return 0

  return +tailwindConfig.theme.screens[value]?.slice(
    0,
    tailwindConfig.theme.screens[value].indexOf('px')
  )
}

export const getCurrentBreakpoint = (): string => {
  if (typeof window == 'undefined') return ''
  let currentBreakpoint = 'sm'
  let biggestBreakpointValue = 0
  for (const breakpoint of Object.keys(tailwindConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint)
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue
      currentBreakpoint = breakpoint
    }
  }
  // When we don't get a value means we are on the smallest
  return currentBreakpoint
}

export default tailwindConfig
