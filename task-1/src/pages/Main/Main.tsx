import { ChangeEvent, useEffect, useState } from 'react'
import usePersistedSearchTerm from '../../hooks/usePersistedSearchTerm.ts'
import useFetchItems from '../../hooks/useFetchItems.ts'
import SearchBar from '../../components/SearchBar/SearchBar.tsx'
import ProductList from '../../components/ProductList/ProductList.tsx'

function Main() {
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
    )
}

export default Main
