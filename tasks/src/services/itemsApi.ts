import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, ProductListResponse } from '../shared/types/product.ts'

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getItems: builder.query<
            ProductListResponse,
            { query: string; page: number }
        >({
            query: ({ query, page }) => {
                const limit = 10
                const offset = (page - 1) * limit
                return query
                    ? `products/search?limit=${limit}&skip=${offset}&q=${query}`
                    : `products?limit=${limit}&skip=${offset}`
            },
        }),
        getItemDetails: builder.query<Product, string | undefined>({
            query: (id) => `products/${id}`,
        }),
    }),
})

export const { useGetItemsQuery, useGetItemDetailsQuery } = itemsApi
