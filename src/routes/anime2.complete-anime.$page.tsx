import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { AnimeListPage } from "@/components/anime/anime-list-page"

export const Route = createFileRoute("/anime2/complete-anime/$page")({
  component: () => {
    const { page } = Route.useParams()
    const pageNum = parseInt(page, 10)
    return (
      <>
        <Helmet><title>Completed Anime - Page {pageNum}</title></Helmet>
        <AnimeListPage source={2} page={isNaN(pageNum) ? 1 : pageNum} type="complete" />
      </>
    )
  },
})
