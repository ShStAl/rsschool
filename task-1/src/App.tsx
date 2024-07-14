import './App.css'
import React, { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import { Product, ProductListResponse } from './shared/types/product'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import SearchBar from './components/SearchBar/SearchBar'
import ProductList from './components/ProductList/ProductList'
import usePersistedSearchTerm from './hooks/usePersistedSearchTerm.ts'

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const [items, setItems] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchItems(searchTerm)
    }, [])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const trimmedSearchTerm = event.target.value.trim()
        setInput(trimmedSearchTerm)
    }

    const handleSearchButtonClick = () => {
        setSearchTerm(input)
        fetchItems(input)
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
                        searchTerm={input}
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
