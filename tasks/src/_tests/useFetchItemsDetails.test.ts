import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useFetchItemDetails from '../hooks/useFetchItemsDetails.ts'

describe('useFetchItemDetails', () => {
    it('should clear item details', () => {
        // Arrange
        const { result } = renderHook(() => useFetchItemDetails())

        // Set some details
        act(() => {
            result.current.fetchItemDetails('1')
        })

        act(() => {
            result.current.clearItemDetails()
        })

        // Assert
        expect(result.current.itemDetails).toBeNull()
    })
})
