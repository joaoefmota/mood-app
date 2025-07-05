import {
    ErrorComponent,
    Link,
    rootRouteId,
    useMatch,
    useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { Box, Button, Stack } from '@mui/material'
import { Refresh, Home, ArrowBack } from '@mui/icons-material'

export function DefaultCatchBoundary({ error }: Readonly<ErrorComponentProps>) {
    const router = useRouter()
    const isRoot = useMatch({
        strict: false,
        select: (state) => state.id === rootRouteId,
    })

    console.error(error)

    return (
        <Box
            sx={{
                minWidth: 0,
                flex: 1,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
            }}
        >
            <ErrorComponent error={error} />
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Button
                    onClick={() => {
                        router.invalidate()
                    }}
                    variant="contained"
                    color="inherit"
                    startIcon={<Refresh />}
                    size="small"
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        bgcolor: 'grey.600',
                        '&:hover': { bgcolor: 'grey.700' }
                    }}
                >
                    Try Again
                </Button>
                {isRoot ? (
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="inherit"
                        startIcon={<Home />}
                        size="small"
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            bgcolor: 'grey.600',
                            '&:hover': { bgcolor: 'grey.700' }
                        }}
                    >
                        Home
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="inherit"
                        startIcon={<ArrowBack />}
                        size="small"
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            bgcolor: 'grey.600',
                            '&:hover': { bgcolor: 'grey.700' }
                        }}
                        onClick={(e) => {
                            e.preventDefault()
                            window.history.back()
                        }}
                    >
                        Go Back
                    </Button>
                )}
            </Stack>
        </Box>
    )
}