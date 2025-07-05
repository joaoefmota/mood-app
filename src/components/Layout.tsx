import { ReactNode } from 'react'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container
} from '@mui/material'
import {
    DarkMode,
    LightMode,
} from '@mui/icons-material'
import { useThemeContext } from '../contexts/ThemeContext'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: Readonly<LayoutProps>) {
    const { isDarkMode, toggleDarkMode } = useThemeContext()

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MoodApp
                    </Typography>
                    <IconButton color="inherit" onClick={toggleDarkMode}>
                        {isDarkMode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="md">
                {children}
            </Container>
        </Box>
    )
}
