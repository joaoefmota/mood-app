import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/test"!
        <Link to="/" style={{ marginTop: 16 }}>
            Go to /
        </Link>
    </div>
}
