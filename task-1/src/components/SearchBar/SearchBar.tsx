import React, { ChangeEvent } from 'react'

interface SearchBarProps {
    searchTerm: string
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSearchButtonClick: () => void
    onThrowErrorClick: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchInputChange,
    onSearchButtonClick,
    onThrowErrorClick,
}) => (
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
        <button onClick={onThrowErrorClick}>Throw Error</button>
    </div>
)

export default SearchBar
