import { test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.tsx'

// A component that throws an error
const ProblematicComponent = () => {
    throw new Error('Test error')
}

// A wrapper component to test ErrorBoundary
const TestWrapper = ({ children }: { children: ReactNode }) => (
    <ErrorBoundary>{children}</ErrorBoundary>
)

describe('ErrorBoundary', () => {
    test('renders fallback UI when a child component throws an error', () => {
        render(
            <TestWrapper>
                <ProblematicComponent />
            </TestWrapper>
        )

        expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
    })

    test('renders children when no error is thrown', () => {
        const TestComponent = () => <div>All good</div>

        render(
            <TestWrapper>
                <TestComponent />
            </TestWrapper>
        )

        expect(screen.getByText('All good')).toBeInTheDocument()
    })
})
