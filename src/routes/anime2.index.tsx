import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { AnimePageShell } from "@/components/anime/anime-page-shell"

export const Route = createFileRoute("/anime2/")({
  component: () => (
    <>
      <Helmet>
        <title>Anime2</title>
        <meta name="description" content="Watch anime online — source 2." />
      </Helmet>
      <AnimePageShell source={2} />
    </>
  ),
})
