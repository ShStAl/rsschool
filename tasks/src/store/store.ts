import { configureStore } from '@reduxjs/toolkit'
import { itemsApi } from '../services/itemsApi.ts'
import itemsReducer from './slices/items/itemsSlice.ts'

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
