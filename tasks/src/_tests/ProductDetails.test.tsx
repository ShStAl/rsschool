import { test, describe } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails/ProductDetails.tsx'

describe('ProductDetails', () => {
    test('renders product details and handles close button click', () => {
        render(
            <BrowserRouter>
                <ProductDetails />
            </BrowserRouter>
        )

        const closeButton = screen.getByText('Close')
        fireEvent.click(closeButton)
    })
})
