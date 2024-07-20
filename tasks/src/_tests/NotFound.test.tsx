import { test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotFound from '../pages/NotFound/NotFound.tsx'

describe('NotFound', () => {
    test('renders 404 message and description', () => {
        render(<NotFound />)

        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
        expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument()
    })
})
