import { useState } from 'react'
import axios from 'axios'
import { Product, ProductListResponse } from '../shared/types/product'

const useFetchItems = () => {
    const [items, setItems] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState(1)

    const fetchItems = (query: string, page: number = 1) => {
        setLoading(true)
        setError(null)
        const limit = 10
        const offset = (page - 1) * limit
        const url = query
            ? `https://dummyjson.com/products/search?limit=${limit}&skip=${offset}&q=${query}`
            : `https://dummyjson.com/products?limit=0&skip=${offset}`

        axios
            .get<ProductListResponse>(url)
            .then((response) => {
                setItems(response.data.products)
                setTotalPages(Math.ceil(response.data.total / limit)) // Assuming the response has a total count
                setLoading(false)
            })
            .catch((error) => {
                console.error('API call failed', error)
                setError('Failed to fetch items')
                setLoading(false)
            })
    }

    return { items, loading, error, totalPages, fetchItems }
}

export default useFetchItems
