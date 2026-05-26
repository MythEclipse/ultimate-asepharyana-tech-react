import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import AnimeSearchPage from "@/components/anime/anime-search-route"

export const Route = createFileRoute("/anime2/search")({
  validateSearch: (search: Record<string, unknown>) => ({ q: (search.q as string) || "" }),
  component: () => {
    const { q } = Route.useSearch()
    return (
      <>
        <Helmet><title>Search Anime2</title></Helmet>
        <AnimeSearchPage query={q} source={2} />
      </>
    )
  },
})
