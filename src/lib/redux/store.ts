import { configureStore } from "@reduxjs/toolkit"

const emptyReducer = (state: Record<string, never> = {}) => state

export const makeStore = () => {
  return configureStore({
    reducer: emptyReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
