import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { ClientLayout } from "@/components/layout/client-layout"

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent() {
  return (
    <ClientLayout>
      <Helmet defaultTitle="Asep Haryana Saputra" titleTemplate="%s | Asep Haryana Saputra">
        <meta name="description" content="Crafting robust Backend systems with high-performance Frontend solutions to build seamless digital experiences." />
        <meta property="og:site_name" content="Asep Haryana Portfolio" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Outlet />
    </ClientLayout>
  )
}

function NotFoundComponent() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-foreground">
      <div className="max-w-lg w-full rounded-3xl border border-border/20 bg-card/40 p-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight">Page Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The requested page could not be located.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
