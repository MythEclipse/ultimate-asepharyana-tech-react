import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { KomikPageClient } from "@/components/komik/komik-page-client"

export const Route = createFileRoute("/komik/")({
  component: () => (
    <>
      <Helmet><title>Komik</title></Helmet>
      <KomikPageClient />
    </>
  ),
})
