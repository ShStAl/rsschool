import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from '../store/slices/items/itemsSlice.ts'
import { ThemeContext } from '../shared/context/ThemeContext.tsx'
import Main from '../pages/Main/Main.tsx'
import { itemsApi } from '../services/itemsApi.ts'

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemsApi.middleware),
})

const mockToggleTheme = vi.fn()

const renderWithProviders = (ui: JSX.Element) => {
    return render(
        <Provider store={store}>
            <ThemeContext.Provider
                value={{ theme: 'light', toggleTheme: mockToggleTheme }}
            >
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={ui} />
                        <Route
                            path="details/:id"
                            element={<div>Details</div>}
                        />
                        <Route
                            path="search/:page"
                            element={<div>Search Results</div>}
                        />
                    </Routes>
                </MemoryRouter>
            </ThemeContext.Provider>
        </Provider>
    )
}

describe('Main Component', () => {
    it('renders correctly', () => {
        renderWithProviders(<Main />)
        expect(screen.getByText('Toggle to Dark Theme')).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('Type product name here...')
        ).toBeInTheDocument()
    })

    it('handles search input change and button click', async () => {
        renderWithProviders(<Main />)
        const searchInput = screen.getByPlaceholderText(
            'Type product name here...'
        ) as HTMLInputElement
        const searchButton = screen.getByText('Search')

        fireEvent.change(searchInput, { target: { value: 'iphone' } })
        fireEvent.click(searchButton)

        await waitFor(() => {
            expect(window.location.pathname).toBe('/')
        })
    })

    it('handles theme toggle', () => {
        renderWithProviders(<Main />)
        const toggleButton = screen.getByText('Toggle to Dark Theme')
        fireEvent.click(toggleButton)
        expect(mockToggleTheme).toHaveBeenCalled()
    })
})
