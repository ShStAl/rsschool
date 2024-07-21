import { test } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.tsx'

test('renders without crashing', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )
})
