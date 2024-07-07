import './App.css'
import { Component, ChangeEvent } from 'react'

interface AppState {
    searchTerm: string;
}

class App extends Component<{}, AppState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            searchTerm: '',
        }
    }

    handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value })
    }

    handleSearchButtonClick = () => {
        const { searchTerm } = this.state
        const trimmedSearchTerm = searchTerm.trim()
        localStorage.setItem('searchTerm', trimmedSearchTerm)
    }


    render() {

        const { searchTerm } = this.state

        return (
            <>
                <div className="layout">
                    <div className="top-section">
                        <div className="search-bar">
                            <input className="search-input" placeholder="Type search here..." type="text"
                                   value={searchTerm}
                                   onChange={this.handleSearchInputChange} />
                            <button className="search-btn" onClick={this.handleSearchButtonClick}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="bottom-section">
                    </div>
                </div>
            </>
        )
    }
}

export default App
