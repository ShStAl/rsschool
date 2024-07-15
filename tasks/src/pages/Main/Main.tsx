import { ChangeEvent, useEffect, useState } from 'react'
import usePersistedSearchTerm from '../../hooks/usePersistedSearchTerm.ts'
import useFetchItems from '../../hooks/useFetchItems.ts'
import SearchBar from '../../components/SearchBar/SearchBar.tsx'
import ProductList from '../../components/ProductList/ProductList.tsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination.tsx'
import ProductDetails from '../../components/ProductDetails/ProductDetails.tsx'
import useFetchItemDetails from '../../hooks/useFetchItemsDetails.ts'

function Main() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const detailId = queryParams.get('details')

    const { page } = useParams<{ page?: string }>()
    const currentPage = page ? parseInt(page, 10) : 1
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const { items, loading, error, fetchItems, totalPages } = useFetchItems()
    const { itemDetails, loading: detailsLoading, fetchItemDetails, clearItemDetails } = useFetchItemDetails()

    const [showDetails, setShowDetails] = useState<boolean>(!!detailId)


    useEffect(() => {
        fetchItems(searchTerm, currentPage)
    }, [currentPage])

    useEffect(() => {
        if (detailId) {
            fetchItemDetails(detailId)
            setShowDetails(true)
        } else {
            setShowDetails(false)
        }
    }, [detailId])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const trimmedSearchTerm = event.target.value.trim()
        setInput(trimmedSearchTerm)
    }

    const handleSearchButtonClick = () => {
        setSearchTerm(input)
        fetchItems(input, 1)
        navigate(`/search/1`)
        setShowDetails(false)
    }

    const handleItemClick = (id: number) => {
        navigate(`/search/${currentPage}?details=${id}`)
        setShowDetails(true)
    }

    const handleCloseDetails = () => {
        navigate(`/search/${currentPage}`)
        clearItemDetails()
        setShowDetails(false)
    }

    const handleLeftSectionClick = () => {
        setShowDetails(false)
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
                        <Pagination currentPage={currentPage} totalPages={totalPages} />
                    )}
                </div>
                {showDetails && (
                    <div className="right-section">
                        <button onClick={handleCloseDetails}>Close</button>
                        {detailsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ProductDetails details={itemDetails} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main
