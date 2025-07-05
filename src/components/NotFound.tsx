import { Link } from '@tanstack/react-router'
import { Box, Typography, Button, Stack } from '@mui/material'
import { ArrowBack, Home } from '@mui/icons-material'

export function NotFound({ children }: { readonly children?: React.ReactNode }) {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {children ?? 'The page you are looking for does not exist.'}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Button
                    onClick={() => window.history.back()}
                    variant="contained"
                    color="success"
                    startIcon={<ArrowBack />}
                    size="small"
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                    Go back
                </Button>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="info"
                    startIcon={<Home />}
                    size="small"
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                    Start Over
                </Button>
            </Stack>
        </Box>
    )
}