import { Product } from '../../shared/types/product'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxSetup.ts'
import { toggleItemSelection } from '../../store/slices/items/itemsSlice.ts'

interface ProductListProps {
    items: Product[] | undefined
    onItemClick: (id: number) => void
}

function ProductList({ items, onItemClick }: ProductListProps) {
    const dispatch = useAppDispatch()
    const selectedItems = useAppSelector((state) => state.items.selectedItems)

    const handleCheckboxChange = (product: Product) => {
        dispatch(toggleItemSelection(product))
    }

    return (
        <ul>
            {items?.map((item) => (
                <li key={item.id}>
                    <input className="checkbox"
                           type="checkbox"
                           checked={selectedItems.includes(item)}
                           onChange={() => handleCheckboxChange(item)}
                    />
                    <button className="product-button"
                            onClick={() => onItemClick(item.id)}>
                        {item.title}, {item.price}
                    </button>
                    <p>{item.description}</p>
                </li>
            ))}
        </ul>
    )
}

export default ProductList
