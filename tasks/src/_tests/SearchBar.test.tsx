import { test, describe, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar/SearchBar.tsx'

describe('SearchBar', () => {
    test('renders search input and buttons', () => {
        render(
            <SearchBar
                searchTerm=""
                onSearchInputChange={() => {
                }}
                onSearchButtonClick={() => {
                }}
            />,
        )

        expect(screen.getByPlaceholderText('Type product name here...')).toBeInTheDocument()
        expect(screen.getByText('Search')).toBeInTheDocument()
        expect(screen.getByText('Throw Error')).toBeInTheDocument()
    })

    test('handles search input change', () => {
        const handleChange = vi.fn()
        render(
            <SearchBar
                searchTerm=""
                onSearchInputChange={handleChange}
                onSearchButtonClick={() => {
                }}
            />,
        )

        const input = screen.getByPlaceholderText('Type product name here...')
        fireEvent.change(input, { target: { value: 'test' } })
        expect(handleChange).toHaveBeenCalled()
    })

    test('handles search button click', () => {
        const handleClick = vi.fn()
        render(
            <SearchBar
                searchTerm=""
                onSearchInputChange={() => {
                }}
                onSearchButtonClick={handleClick}
            />,
        )

        const button = screen.getByText('Search')
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalled()
    })

    test('throws error on Throw Error button click', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {
        }) // Suppress error output in test

        expect(() => {
            render(
                <SearchBar
                    searchTerm=""
                    onSearchInputChange={() => {
                    }}
                    onSearchButtonClick={() => {
                    }}
                />,
            )

            const button = screen.getByText('Throw Error')
            fireEvent.click(button)
        }).toThrow('Error happened!')
    })
})
