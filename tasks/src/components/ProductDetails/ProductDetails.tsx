import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetItemDetailsQuery } from '../../services/itemsApi.ts'

function ProductDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const { data, isLoading, error } = useGetItemDetailsQuery(id)

    const handleCloseDetails = () => {
        navigate(location.pathname.split('/details')[0])
    }

    if (error) {
        return <p>There was an error!</p>
    }

    return (
        <div>
            <button onClick={handleCloseDetails}>Close</button>
            {isLoading && <p>Loading...</p>}
            {data ? (
                <div>
                    <h2>Product Details</h2>
                    <h2>
                        {data?.title}, {data?.price}
                    </h2>
                    <p>{data?.description}</p>
                    <p>Rating: {data?.rating}</p>
                    <p>Review: {data?.reviews && data?.reviews[0].comment}</p>
                </div>
            ) : (
                <p>No details available</p>
            )}
        </div>
    )
}

export default ProductDetails
