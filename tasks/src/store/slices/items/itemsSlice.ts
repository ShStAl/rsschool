import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemsState {
    totalPages: number
    currentPage: number
}

const initialState: ItemsState = {
    totalPages: 0,
    currentPage: 1,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
    },
})

export const { setTotalPages, setCurrentPage } = itemsSlice.actions

export default itemsSlice.reducer
