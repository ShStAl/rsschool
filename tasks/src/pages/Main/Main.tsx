import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import usePersistedSearchTerm from '../../hooks/usePersistedSearchTerm.ts'
import { useGetItemsQuery } from '../../services/itemsApi.ts'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxSetup.ts'
import {
    setTotalPages,
    setPageItems,
    setItemDetails,
    clearItemsSelection,
} from '../../store/slices/items/itemsSlice.ts'
import SearchBar from '../../components/SearchBar/SearchBar.tsx'
import ProductList from '../../components/ProductList/ProductList.tsx'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination.tsx'
import { ThemeContext } from '../../shared/context/ThemeContext.tsx'


function Main() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { theme, toggleTheme } = useContext(ThemeContext)

    const { page, id } = useParams<{ page?: string; id?: string }>()
    const currentPage = page ? parseInt(page, 10) : 1
    const showDetails = !!id

    const [searchTerm, setSearchTerm] = usePersistedSearchTerm('searchTerm')
    const [input, setInput] = useState(searchTerm)
    const { totalPages, pageItems, selectedItems } = useAppSelector((state) => state.items)
    const { data, isFetching, error } = useGetItemsQuery({
        query: searchTerm,
        page: currentPage,
    })
    const showPopup = selectedItems.length > 0
    const downloadLinkRef = useRef<HTMLAnchorElement>(null)


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

    const generateCsvData = () => {
        const csvHeader = 'Name,Price,Rating\n'
        const csvRows = selectedItems.map(item => `${item.title},${item.price},${item.rating}`).join('\n')
        return `${csvHeader}${csvRows}`
    }

    const handleDownload = () => {
        const csvData = generateCsvData()
        const blob = new Blob([csvData], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        if (downloadLinkRef.current) {
            downloadLinkRef.current.href = url
            downloadLinkRef.current.download = `${selectedItems.length}_products.csv`
            downloadLinkRef.current.click()
            window.URL.revokeObjectURL(url)
        }
    }

    const handleItemsUnselect = () => {
        dispatch(clearItemsSelection())
    }

    return (
        <div className={`layout ${theme}`}>
            <div className={`top-section ${theme}`}>
                <button onClick={toggleTheme}>
                    Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
                </button>
                <SearchBar
                    searchTerm={input}
                    onSearchInputChange={handleSearchInputChange}
                    onSearchButtonClick={handleSearchButtonClick}
                />
            </div>
            <div className={`bottom-section ${theme}`}>
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
                    <div className={`right-section ${theme}`}>
                        <Outlet />
                    </div>
                ) : undefined}
            </div>
            {showPopup ? (
                <div className="selected-items">
                    <p className="selected-items-text">{selectedItems.length} items are selected</p>
                    <button className="selected-items-button" onClick={() => handleDownload()}>
                        Download
                    </button>
                    <a ref={downloadLinkRef} style={{ display: 'none' }}>Download Link</a>
                    <button className="selected-items-button" onClick={() => handleItemsUnselect()}>Unselect all
                    </button>
                </div>
            ) : undefined}
        </div>
    )
}

export default Main
