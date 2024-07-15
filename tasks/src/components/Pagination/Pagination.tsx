import { useNavigate } from 'react-router-dom'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
    const navigate = useNavigate()

    const handlePageClick = (page: number) => {
        navigate(`/search/${page}`)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button className="search-btn"
                        key={i}
                        onClick={() => handlePageClick(i)}
                        disabled={i === currentPage}
                >
                    {i}
                </button>,
            )
        }
        return pageNumbers
    }

    return (
        <div className="pagination">
            {renderPageNumbers()}
        </div>
    )
}

export default Pagination
