import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../../shared/types/product.ts'

export interface ItemsState {
    totalPages: number
    itemDetails: Product | null
    pageItems: Product[]
}

const initialState: ItemsState = {
    totalPages: 0,
    itemDetails: null,
    pageItems: [],
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setItemDetails: (state, action: PayloadAction<Product>) => {
            state.itemDetails = action.payload
        },
        setPageItems: (state, action: PayloadAction<Product[]>) => {
            state.pageItems = action.payload
        },
    },
})

export const { setTotalPages, setItemDetails, setPageItems } =
    itemsSlice.actions

export default itemsSlice.reducer
