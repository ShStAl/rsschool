import { Product } from '../../shared/types/product'

interface ProductDetailsProps {
    details: Product | null
}

function ProductDetails({ details }: ProductDetailsProps) {
    return (
        <div>
            <h2>Product Details</h2>
            <h2>
                {details?.title}, {details?.price}
            </h2>
            <p>{details?.description}</p>
            <p>Rating: {details?.rating}</p>
            <p>Review: {details?.reviews[0].comment}</p>
        </div>
    )
}

export default ProductDetails
