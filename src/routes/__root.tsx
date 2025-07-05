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
                title: 'TanStack Start Starter',
            },
        ],
        links: [{
            rel: 'stylesheet',
            href: '/src/styles/globals.css',
        }],
        ...seo({
            title: 'TanStack Start Starter',
            description: 'A starter template for TanStack Start with React.',
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

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <ReactQueryDevtools buttonPosition="bottom-left" />
                <Scripts />
            </body>
        </html>
    )
}