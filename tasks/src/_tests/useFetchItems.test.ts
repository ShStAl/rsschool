import { renderHook, act } from '@testing-library/react'
import axios from 'axios'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import useFetchItems from '../hooks/useFetchItems'

vi.mock('axios')

describe('useFetchItems', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('should fetch items successfully', async () => {
        const mockResponse = {
            data: {
                products: [
                    { id: 1, name: 'Product 1' },
                    { id: 2, name: 'Product 2' },
                ],
                total: 20,
            },
        }
        vi.spyOn(axios, 'get').mockResolvedValue(mockResponse)

        const { result } = renderHook(() => useFetchItems())

        await act(async () => {
            result.current.fetchItems('')
        })

        expect(result.current.loading).toBe(false)
        expect(result.current.items).toEqual(mockResponse.data.products)
        expect(result.current.totalPages).toBe(2)
        expect(result.current.error).toBeNull()
    })

    it('should handle errors', async () => {
        vi.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'))

        const { result } = renderHook(() => useFetchItems())

        await act(async () => {
            result.current.fetchItems('')
        })

        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBe('Failed to fetch items')
        expect(result.current.items).toEqual([])
    })

    it('should use search URL when query is provided', async () => {
        const mockResponse = {
            data: {
                products: [{ id: 1, name: 'Searched Product' }],
                total: 1,
            },
        }
        const axiosGetSpy = vi
            .spyOn(axios, 'get')
            .mockResolvedValue(mockResponse)

        const { result } = renderHook(() => useFetchItems())

        await act(async () => {
            result.current.fetchItems('searchQuery', 2)
        })

        expect(axiosGetSpy).toHaveBeenCalledWith(
            'https://dummyjson.com/products/search?limit=10&skip=10&q=searchQuery'
        )
    })
})
