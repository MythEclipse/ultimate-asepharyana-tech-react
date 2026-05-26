import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import AnimeDetailRoute from "@/components/anime/anime-detail-route"

export const Route = createFileRoute("/anime/detail/$slug")({
  component: () => (
    <>
      <Helmet><title>Anime Detail</title></Helmet>
      <AnimeDetailRoute source={1} />
    </>
  ),
})
