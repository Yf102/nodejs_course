import { render as rtlRender } from '@testing-library/react'
import { getStoreForTesting, AppStore } from 'store/store'
import { Provider } from 'react-redux'

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    // @ts-ignore
    store = getStoreForTesting(preloadedState) as AppStore,
    ...renderOptions
  }: {
    preloadedState: Record<string, unknown> | undefined
  } = {
    preloadedState: undefined,
  }
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
