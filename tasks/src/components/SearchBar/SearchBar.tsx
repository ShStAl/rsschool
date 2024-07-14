import React, { ChangeEvent, useState, useEffect } from 'react'

interface SearchBarProps {
    searchTerm: string;
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchButtonClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchInputChange, onSearchButtonClick }) => {
    const [error, setError] = useState(false)

    useEffect(() => {
        if (error) {
            throw new Error('Error happened!')
        }
    }, [error])

    const handleThrowErrorClick = () => {
        setError(true)
    }

    return (
        <div className="search-bar">
            <input
                className="search-input"
                placeholder="Type product name here..."
                type="text"
                value={searchTerm}
                onChange={onSearchInputChange}
            />
            <button className="search-btn" onClick={onSearchButtonClick}>
                Search
            </button>
            <button onClick={handleThrowErrorClick}>Throw Error</button>
        </div>
    )
}

export default SearchBar
