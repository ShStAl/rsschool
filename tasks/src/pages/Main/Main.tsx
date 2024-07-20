import { ChangeEvent, useEffect, useState } from 'react'
import usePersistedSearchTerm from '../../hooks/usePersistedSearchTerm.ts'
import useFetchItems from '../../hooks/useFetchItems.ts'
import SearchBar from '../../components/SearchBar/SearchBar.tsx'
import ProductList from '../../components/ProductList/ProductList.tsx'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination.tsx'

function Main() {
    const location = useLocation()

    const { page, id } = useParams<{ page?: string; id?: string }>()
    const currentPage = page ? parseInt(page, 10) : 1
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const { items, loading, error, fetchItems, totalPages } = useFetchItems()

    const showDetails = !!id

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

    const handleItemClick = (id: number) => {
        navigate(`details/${id}`, { relative: 'route' })
    }

    const handleLeftSectionClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget && showDetails) {
            navigate(location.pathname.split('/details')[0])
        }
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
                <div className="left-section" onClick={handleLeftSectionClick}>
                    {loading && <p className="info-message">Loading...</p>}
                    {error && <p className="error-message">{error}</p>}
                    <ProductList items={items} onItemClick={handleItemClick} />
                    {!loading && !error && totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    )}
                </div>
                {showDetails ? (
                    <div className="right-section">
                        <Outlet />
                    </div>
                ) : undefined}
            </div>
        </div>
    )
}

export default Main
