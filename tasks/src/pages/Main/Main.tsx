import { ChangeEvent, useEffect, useState } from 'react'
import usePersistedSearchTerm from '../../hooks/usePersistedSearchTerm.ts'
import useFetchItems from '../../hooks/useFetchItems.ts'
import SearchBar from '../../components/SearchBar/SearchBar.tsx'
import ProductList from '../../components/ProductList/ProductList.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination.tsx'

function Main() {
    const { page } = useParams<{ page?: string }>()
    const currentPage = page ? parseInt(page, 10) : 1
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const { items, loading, error, fetchItems, totalPages } = useFetchItems()


    useEffect(() => {
        fetchItems(searchTerm, currentPage)
    }, [currentPage])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const trimmedSearchTerm = event.target.value.trim()
        setInput(trimmedSearchTerm)
    }

    const handleSearchButtonClick = () => {
        setSearchTerm(input)
        fetchItems(input, 1)
        navigate(`/search/1`)
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
                {!loading && !error && totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                )}
            </div>
        </div>
    )
}

export default Main
