import React, { useState, useEffect } from 'react'

const usePersistedSearchTerm = (
    key: string,
    initialValue: string = ''
): [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [value, setValue] = useState<string>(() => {
        const savedValue = localStorage.getItem(key)
        return savedValue !== null ? savedValue : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, value)
        return () => {
            localStorage.setItem(key, value)
        }
    }, [value, key])

    return [value, setValue]
}

export default usePersistedSearchTerm
