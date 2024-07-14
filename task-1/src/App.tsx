import './App.css'
import React, { useState, useEffect, ChangeEvent } from 'react'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import SearchBar from './components/SearchBar/SearchBar'
import ProductList from './components/ProductList/ProductList'
import usePersistedSearchTerm from './hooks/usePersistedSearchTerm.ts'
import useFetchItems from './hooks/useFetchItems.ts'

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const { items, loading, error, fetchItems } = useFetchItems()


    useEffect(() => {
        fetchItems(searchTerm)
        return () => {
            setSearchTerm(input)
        }
    }, [])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const trimmedSearchTerm = event.target.value.trim()
        setInput(trimmedSearchTerm)
    }

    const handleSearchButtonClick = () => {
        setSearchTerm(input)
        fetchItems(input)
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
