import './App.css'
import { Component, ChangeEvent } from 'react'
import axios from 'axios'
import { Product, ProductListResponse } from './shared/types/product.ts'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'

interface AppState {
    searchTerm: string;
    items: Product[];
    error: string | null;
    loading: boolean;
}

class App extends Component<{}, AppState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            searchTerm: '',
            items: [],
            error: null,
            loading: false,
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
        this.setState({ loading: true, error: null })
        const { searchTerm } = this.state
        const query = searchTerm.trim()
        const url = query ? `https://dummyjson.com/products/search?limit=10&q=${query}` : 'https://dummyjson.com/products'

        axios.get<ProductListResponse>(url)
            .then(response => {
                this.setState({ items: response.data.products, loading: false })
            })
            .catch(error => {
                console.error('API call failed', error)
                this.setState({ error: 'Failed to fetch items', loading: false })
                throw new Error('Failed to fetch items')
            })
    }

    throwError = () => {
        this.setState({ error: 'Error occured' })
        throw new Error('Test Error')
    }


    render() {

        const { searchTerm, items, error, loading } = this.state

        return (
            <ErrorBoundary>
                <div className="layout">
                    <div className="top-section">
                        <div className="search-bar">
                            <input className="search-input" placeholder="Type product name here..." type="text"
                                   value={searchTerm}
                                   onChange={this.handleSearchInputChange} />
                            <button className="search-btn" onClick={this.handleSearchButtonClick}>
                                Search
                            </button>
                            <button onClick={this.throwError}>Throw Error</button>
                        </div>
                    </div>
                    <div className="bottom-section">
                        {loading && <p className="info-message">Loading...</p>}
                        {error && <p className="error-message">{error}</p>}
                        <ul>
                            {items.map(item => (
                                <li key={item.id}>
                                    <h2>{item.title}, {item.price}</h2>
                                    <p>{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </ErrorBoundary>
        )
    }
}

export default App
