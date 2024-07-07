import './App.css'
import { Component, ChangeEvent } from 'react'
import axios from 'axios'

interface AppState {
    searchTerm: string;
    items: any[],
}

class App extends Component<{}, AppState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            searchTerm: '',
            items: [],
        }
    }

    componentDidMount() {
        const savedSearchTerm = localStorage.getItem('searchTerm') || ''
        this.setState({ searchTerm: savedSearchTerm }, this.fetchItems)
    }

    handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value })
    }

    handleSearchButtonClick = () => {
        const { searchTerm } = this.state
        const trimmedSearchTerm = searchTerm.trim()
        localStorage.setItem('searchTerm', trimmedSearchTerm)
        this.fetchItems()
    }

    fetchItems = () => {
        const { searchTerm } = this.state
        const query = searchTerm.trim()
        const url = query ? `https://dummyjson.com/products/search?limit=10&q=${query}` : 'https://dummyjson.com/products?limit=10'

        axios.get<any[]>(url)
            .then(response => {
                this.setState({ items: response.data })
            })
            .catch(error => {
                console.error('API call failed', error)
            })
    }


    render() {

        const { searchTerm } = this.state

        return (
            <>
                <div className="layout">
                    <div className="top-section">
                        <div className="search-bar">
                            <input className="search-input" placeholder="Type product name here..." type="text"
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
