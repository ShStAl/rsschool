import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../../shared/types/product.ts'

export interface ItemsState {
    totalPages: number
    itemDetails: Product | null
    pageItems: Product[]
    selectedItems: number[],
}

const initialState: ItemsState = {
    totalPages: 0,
    itemDetails: null,
    pageItems: [],
    selectedItems: [],
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
        toggleItemSelection: (state, action: PayloadAction<number>) => {
            const index = state.selectedItems.indexOf(action.payload)
            if (index === -1) {
                state.selectedItems.push(action.payload)
            } else {
                state.selectedItems.splice(index, 1)
            }
        },
    },
})

export const { setTotalPages, setItemDetails, setPageItems, toggleItemSelection } =
    itemsSlice.actions

export default itemsSlice.reducer
