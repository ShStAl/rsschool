import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../store/slices/items/itemsSlice.ts'
import ProductList from '../components/ProductList/ProductList.tsx'
import { ReactElement } from 'react'

// Mock the Redux hooks
vi.mock('../../hooks/reduxSetup', () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
}))

// Create a mock store
const createMockStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            items: itemsReducer,
        },
        preloadedState,
    })
}

describe('ProductList', () => {
    const mockItems = [
        { id: 1, title: 'Product 1', price: 10, description: 'Description 1' },
        { id: 2, title: 'Product 2', price: 20, description: 'Description 2' },
    ]

    const mockOnItemClick = vi.fn()

    const renderWithRedux = (
        component: ReactElement,
        store = createMockStore()
    ) => {
        return render(<Provider store={store}>{component}</Provider>)
    }

    it('renders the list of products', () => {
        renderWithRedux(
            <ProductList items={mockItems} onItemClick={mockOnItemClick} />
        )

        expect(screen.getByText('Product 1, 10')).toBeInTheDocument()
        expect(screen.getByText('Product 2, 20')).toBeInTheDocument()
        expect(screen.getByText('Description 1')).toBeInTheDocument()
        expect(screen.getByText('Description 2')).toBeInTheDocument()
    })

    it('calls onItemClick when a product button is clicked', () => {
        renderWithRedux(
            <ProductList items={mockItems} onItemClick={mockOnItemClick} />
        )

        const productButton = screen.getByText('Product 1, 10')
        fireEvent.click(productButton)

        expect(mockOnItemClick).toHaveBeenCalledWith(1)
    })

    it('renders empty list when no items are provided', () => {
        renderWithRedux(
            <ProductList items={undefined} onItemClick={mockOnItemClick} />
        )

        expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    })
})
