import { test, describe, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Pagination from '../components/Pagination/Pagination.tsx'

describe('Pagination', () => {
    test('renders pagination buttons', () => {
        render(
            <BrowserRouter>
                <Pagination currentPage={1} totalPages={5} />
            </BrowserRouter>
        )

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('4')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
    })

    test('handles page click', () => {
        render(
            <BrowserRouter>
                <Pagination currentPage={1} totalPages={5} />
            </BrowserRouter>
        )

        const button = screen.getByText('1')
        fireEvent.click(button)
        expect(button).toBeDisabled()
    })
})
