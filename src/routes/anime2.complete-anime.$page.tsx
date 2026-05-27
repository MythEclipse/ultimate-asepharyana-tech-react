import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { AnimeListPage } from "@/components/anime/anime-list-page"

export const Route = createFileRoute("/anime2/complete-anime/$page")({
  component: () => {
    const { page } = Route.useParams()
    const pageNum = parseInt(page, 10)
    const title = `Completed Anime - Page ${isNaN(pageNum) ? 1 : pageNum}`
    return (
      <>
        <Helmet><title>{title}</title></Helmet>
        <AnimeListPage source={2} page={isNaN(pageNum) ? 1 : pageNum} type="complete" />
      </>
    )
  },
})
