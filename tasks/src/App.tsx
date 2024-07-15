import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main/Main.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'

function App() {

    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
    )
}

export default App
