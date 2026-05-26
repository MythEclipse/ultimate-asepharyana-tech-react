import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import AnimeSearchPage from "@/components/anime/anime-search-route"

export const Route = createFileRoute("/anime/search")({
  validateSearch: (search: Record<string, unknown>) => ({ q: (search.q as string) || "" }),
  component: () => {
    const { q } = Route.useSearch()
    return (
      <>
        <Helmet><title>Search Anime</title></Helmet>
        <AnimeSearchPage query={q} source={1} />
      </>
    )
  },
})
