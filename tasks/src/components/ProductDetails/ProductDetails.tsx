import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useFetchItemDetails from '../../hooks/useFetchItemsDetails.ts'
import { useEffect } from 'react'

function ProductDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const { itemDetails, loading, fetchItemDetails, clearItemDetails } =
        useFetchItemDetails()

    useEffect(() => {
        if (id) {
            fetchItemDetails(id)
        }
        return () => {
            clearItemDetails()
        }
    }, [id])

    const handleCloseDetails = () => {
        navigate(location.pathname.split('/details')[0])
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <button onClick={handleCloseDetails}>Close</button>
            {itemDetails ? (
                <div>
                    <h2>Product Details</h2>
                    <h2>
                        {itemDetails?.title}, {itemDetails?.price}
                    </h2>
                    <p>{itemDetails?.description}</p>
                    <p>Rating: {itemDetails?.rating}</p>
                    <p>Review: {itemDetails?.reviews && itemDetails?.reviews[0].comment}</p>
                </div>
            ) : (
                <p>No details available</p>
            )}
        </div>
    )
}

export default ProductDetails
