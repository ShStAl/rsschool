import React, { createContext, useState } from 'react'

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
})

interface Props {
    children: React.ReactNode
}

function ThemeProvider({ children }: Props) {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
