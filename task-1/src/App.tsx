import './App.css'
import { Component } from 'react'

class App extends Component {

    render() {
        return (
            <>
                <div className="layout">
                    <div className="top-section">
                        <div className="search-bar">
                            <input className="search-input" placeholder="Type search here..." />
                            <button className="search-btn">
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
