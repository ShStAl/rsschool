import React, { ChangeEvent } from 'react'
import { Component } from 'react'

interface SearchBarProps {
    searchTerm: string
    onSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    onSearchButtonClick: () => void
    onThrowErrorClick: () => void
}

class SearchBar extends Component<SearchBarProps> {
    constructor(props: SearchBarProps) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidUpdate() {
        if (this.state.error) {
            throw new Error('Error happened!');
        }
    }

    handleThrowErrorClick = () => {
        this.setState({
            error: true,
        });
    };

    render() {
        const { searchTerm, onSearchInputChange, onSearchButtonClick, onThrowErrorClick } = this.props;

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
                <button onClick={this.handleThrowErrorClick}>Throw Error</button>
            </div>
        );
    }
}

export default SearchBar
