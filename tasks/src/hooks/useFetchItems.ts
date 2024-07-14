import { useState } from 'react'
import axios from 'axios'
import { Product, ProductListResponse } from '../shared/types/product'

const useFetchItems = () => {
    const [items, setItems] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchItems = (query: string) => {
        setLoading(true)
        setError(null)
        const url = query
            ? `https://dummyjson.com/products/search?limit=10&q=${query}`
            : 'https://dummyjson.com/products'

        axios
            .get<ProductListResponse>(url)
            .then((response) => {
                setItems(response.data.products)
                setLoading(false)
            })
            .catch((error) => {
                console.error('API call failed', error)
                setError('Failed to fetch items')
                setLoading(false)
            })
    }

    return { items, loading, error, fetchItems }
}

export default useFetchItems
