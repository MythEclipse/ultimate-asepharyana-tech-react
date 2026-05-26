import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import AnimeDetailRoute from "@/components/anime/anime-detail-route"

export const Route = createFileRoute("/anime2/detail/$slug")({
  component: () => (
    <>
      <Helmet><title>Anime2 Detail</title></Helmet>
      <AnimeDetailRoute source={2} />
    </>
  ),
})
