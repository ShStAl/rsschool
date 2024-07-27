import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Main.test.tsx'
import App from '../App.tsx'

// Mock ReactDOM
vi.mock('react-dom/client', () => ({
    createRoot: vi.fn(() => ({
        render: vi.fn(),
    })),
}))

// Mock App component
vi.mock('./App', () => ({
    default: () => <div data-testid="mock-app">Mocked App</div>,
}))

describe('Index', () => {
    let root: HTMLElement

    beforeEach(() => {
        root = document.createElement('div')
        root.id = 'root'
        document.body.appendChild(root)
    })

    afterEach(() => {
        document.body.removeChild(root)
    })

    it('renders without crashing', () => {
        expect(() => {
            render(
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            )
        }).not.toThrow()
    })
})
