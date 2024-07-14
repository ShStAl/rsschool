import './App.css'
import React, { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import { Product, ProductListResponse } from './shared/types/product'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import SearchBar from './components/SearchBar/SearchBar'
import ProductList from './components/ProductList/ProductList'

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [items, setItems] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const savedSearchTerm = localStorage.getItem('searchTerm') || ''
        setSearchTerm(savedSearchTerm)
        fetchItems(savedSearchTerm)
    }, [])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSearchButtonClick = () => {
        const trimmedSearchTerm = searchTerm.trim()
        localStorage.setItem('searchTerm', trimmedSearchTerm)
        fetchItems(trimmedSearchTerm)
    }

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

    return (
        <ErrorBoundary>
            <div className="layout">
                <div className="top-section">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchInputChange={handleSearchInputChange}
                        onSearchButtonClick={handleSearchButtonClick}
                    />
                </div>
                <div className="bottom-section">
                    {loading && <p className="info-message">Loading...</p>}
                    {error && <p className="error-message">{error}</p>}
                    <ProductList items={items} />
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default App
