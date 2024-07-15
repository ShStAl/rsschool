import { Product } from '../../shared/types/product'

interface ProductListProps {
    items: Product[];
    onItemClick: (id: number) => void;
}

function ProductList({ items, onItemClick }: ProductListProps) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id} onClick={() => onItemClick(item.id)}>
                    <h2>
                        {item.title}, {item.price}
                    </h2>
                    <p>{item.description}</p>
                </li>
            ))}
        </ul>
    )
}

export default ProductList
