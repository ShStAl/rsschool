import { ChangeEvent, useEffect, useState } from 'react'
import usePersistedSearchTerm from '../../hooks/usePersistedSearchTerm.ts'
import { useGetItemsQuery } from '../../services/itemsApi.ts'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxSetup.ts'
import { setTotalPages, setPageItems, setItemDetails } from '../../store/slices/items/itemsSlice.ts'
import SearchBar from '../../components/SearchBar/SearchBar.tsx'
import ProductList from '../../components/ProductList/ProductList.tsx'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination.tsx'

function Main() {
    const location = useLocation()

    const { page, id } = useParams<{ page?: string; id?: string }>()
    const currentPage = page ? parseInt(page, 10) : 1
    const showDetails = !!id

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const { totalPages, pageItems } = useAppSelector((state) => state.items)
    const { data, isFetching, error } = useGetItemsQuery({
        query: searchTerm,
        page: currentPage,
    })

    useEffect(() => {
        if (data) {
            dispatch(setTotalPages(Math.ceil(data.total / 10)))
            dispatch(setPageItems(data.products))
        }
    }, [data])

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const trimmedSearchTerm = event.target.value.trim()
        setInput(trimmedSearchTerm)
    }

    const handleSearchButtonClick = () => {
        setSearchTerm(input)
        navigate(`/search/1`)
    }

    const handleItemClick = (id: number) => {
        navigate(`details/${id}`, { relative: 'route' })
        const itemDetails = pageItems.find((item) => item.id === id)
        if (itemDetails) {
            dispatch(setItemDetails(itemDetails))
        }
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
                    {isFetching && <p className="info-message">Loading...</p>}
                    {error && (
                        <p className="error-message">There was an error!</p>
                    )}
                    <ProductList
                        items={data?.products}
                        onItemClick={handleItemClick}
                    />
                    {!isFetching && !error && totalPages > 1 && (
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
