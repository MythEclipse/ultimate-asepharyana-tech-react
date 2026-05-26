import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <>
      <Helmet><title>Dashboard</title></Helmet>
      <main className="min-h-screen text-foreground pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24">
          <h1 className="text-4xl font-black">Dashboard</h1>
          <p className="text-muted-foreground mt-4">Metrics loading...</p>
        </div>
      </main>
    </>
  ),
})
