import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { api } from 'services'
import modalReducer from './slices/modalSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export const getStoreForTesting = (
  preloadedState: Record<string, unknown> | undefined
) =>
  configureStore({
    ...(preloadedState && { preloadedState }),
    reducer: {
      [api.reducerPath]: api.reducer,
      modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })

export default store

export const makeStore = () => store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>
export type AppStoreTesting = ReturnType<typeof getStoreForTesting>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>
