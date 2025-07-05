import {
    Outlet,
    HeadContent,
    Scripts,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { seo } from "../utils/seo"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DefaultCatchBoundary } from "../components/DefaultCatchBoundary"
import { NotFound } from "../components/NotFound"
import { QueryClient } from "@tanstack/react-query"
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from "../setup/theme"
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'Mood Tracker App',
            },
        ],
        links: [{
            rel: 'stylesheet',
            href: '/src/styles/globals.css',
        }],
        ...seo({
            title: 'Mood Tracker App',
            description: 'Track your daily mood and emotions with this beautiful mood tracker.',
            image: 'https://tanstack.dev/start/og-image.png',
            keywords: 'tanstack, start, react, starter, template',
        })
    }),
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        )
    },
    notFoundComponent: () => <NotFound />,
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function Providers({ children }: { children: React.ReactNode }) {
    const emotionCache = createCache({ key: 'css' })

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                <Providers>
                    <Container component="main" sx={{ paddingBlock: 4 }}>
                        {children}
                        <ReactQueryDevtools buttonPosition="bottom-left" />
                        {/* <TanStackRouterDevtools position="bottom-right" /> */}
                    </Container>
                    <Scripts />
                </Providers>
            </body>
        </html>
    )
}