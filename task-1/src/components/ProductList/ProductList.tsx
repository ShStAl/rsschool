import React from 'react'
import { Product } from '../../shared/types/product'

interface ProductListProps {
    items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ items }) => (
    <ul>
        {items.map((item) => (
            <li key={item.id}>
                <h2>
                    {item.title}, {item.price}
                </h2>
                <p>{item.description}</p>
            </li>
        ))}
    </ul>
)

export default ProductList
