import {configureStore} from '@reduxjs/toolkit'
import notificationsSlice from "./features/notifications/notificationsSlice.ts";
import {apiSlice} from "./features/api/apiSlice.ts";

const store = configureStore({
  reducer: {
    notifications: notificationsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: {
    trace: true,
    traceLimit: 25
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
