import { test, describe, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import Main from '../pages/Main/Main.tsx'

describe('Main', () => {
    test('renders search bar and product list', () => {
        render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        )

        expect(
            screen.getByPlaceholderText('Type product name here...')
        ).toBeInTheDocument()
    })

    test('handles search input change and button click', () => {
        render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        )

        const input: HTMLInputElement = screen.getByPlaceholderText(
            'Type product name here...'
        )
        fireEvent.change(input, { target: { value: 'test' } })
        expect(input.value).toBe('test')

        const button = screen.getByText('Search')
        fireEvent.click(button)
    })
})
