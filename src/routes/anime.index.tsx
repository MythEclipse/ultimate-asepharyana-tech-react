import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { AnimePageShell } from "@/components/anime/anime-page-shell"

export const Route = createFileRoute("/anime/")({
  component: () => (
    <>
      <Helmet>
        <title>Anime</title>
        <meta name="description" content="Watch anime online with high-quality streaming." />
      </Helmet>
      <AnimePageShell source={1} />
    </>
  ),
})
