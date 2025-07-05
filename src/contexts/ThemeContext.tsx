import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from "@emotion/react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme, darkTheme } from "../setup/theme"

// Theme context for dark/light mode switching
const ThemeContext = createContext<{
    isDarkMode: boolean
    toggleDarkMode: () => void
}>({
    isDarkMode: false,
    toggleDarkMode: () => { },
})

export const useThemeContext = () => useContext(ThemeContext)

export function ThemeContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    // Start with default theme to prevent hydration mismatch
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Load theme from localStorage after hydration
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setIsDarkMode(true)
        }
    }, [])

    const emotionCache = createCache({ key: 'css' })

    const toggleDarkMode = () => {
        const newMode = !isDarkMode
        setIsDarkMode(newMode)
        localStorage.setItem('theme', newMode ? 'dark' : 'light')
    }

    const currentTheme = isDarkMode ? darkTheme : theme
    const contextValue = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode])

    return (
        <ThemeContext.Provider value={contextValue}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={currentTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </ThemeContext.Provider>
    )
}
