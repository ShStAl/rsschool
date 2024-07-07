import './App.css'
import { Component, ChangeEvent } from 'react'
import axios from 'axios'
import { Product, ProductListResponse } from './shared/types/product'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import SearchBar from './components/SearchBar/SearchBar.tsx'
import ProductList from './components/ProductList/ProductList.tsx'

interface AppState {
    searchTerm: string
    items: Product[]
    error: string | null
    loading: boolean
}

class App extends Component<object, AppState> {
    constructor(props: object) {
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
        const url = query
            ? `https://dummyjson.com/products/search?limit=10&q=${query}`
            : 'https://dummyjson.com/products'

        axios
            .get<ProductListResponse>(url)
            .then((response) => {
                this.setState({ items: response.data.products, loading: false })
            })
            .catch((error) => {
                console.error('API call failed', error)
                this.setState({
                    error: 'Failed to fetch items',
                    loading: false,
                })
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
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchInputChange={this.handleSearchInputChange}
                            onSearchButtonClick={this.handleSearchButtonClick}
                            onThrowErrorClick={this.throwError}
                        />
                    </div>
                    <div className="bottom-section">
                        {loading && <p className="info-message">Loading...</p>}
                        {error && <p className="error-message">{error}</p>}
                        <ProductList items={items} />
                    </div>
                </div>
            </ErrorBoundary>
        )
    }
}

export default App
