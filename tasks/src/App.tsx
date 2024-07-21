import './App.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main/Main.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'
import ProductDetails from './components/ProductDetails/ProductDetails.tsx'
import { ThemeProvider } from './shared/context/ThemeContext.tsx'

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route
                            path="details/:id"
                            element={<ProductDetails />}
                        />
                    </Route>
                    <Route path="/search/:page" element={<Main />}>
                        <Route
                            path="details/:id"
                            element={<ProductDetails />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

export default App
