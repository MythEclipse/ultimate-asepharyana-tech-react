import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import AnimeWatchPage from "@/components/anime/anime-watch-route"

export const Route = createFileRoute("/anime2/watch/$slug")({
  component: () => (
    <>
      <Helmet><title>Watching</title></Helmet>
      <AnimeWatchPage source={2} />
    </>
  ),
})
