import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main/Main.tsx'

function App() {

    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </ErrorBoundary>
    )
}

export default App
