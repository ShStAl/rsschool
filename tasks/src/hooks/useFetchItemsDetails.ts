import { useState } from 'react'
import axios from 'axios'
import { Product } from '../shared/types/product'

const useFetchItemDetails = () => {
    const [itemDetails, setItemDetails] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchItemDetails = (id: string) => {
        setLoading(true)
        axios
            .get<Product>(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                setItemDetails(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Failed to fetch item details', error)
                setLoading(false)
            })
    }

    const clearItemDetails = () => {
        setItemDetails(null)
    }

    return { itemDetails, loading, fetchItemDetails, clearItemDetails }
}

export default useFetchItemDetails
