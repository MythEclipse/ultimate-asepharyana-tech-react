import { createFileRoute, notFound } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { useQuery } from "@tanstack/react-query"
import { usePageLoadingOverlay } from "@/components/providers/loading-provider"
import { MediaChapterShell } from "@/components/shared/media-chapter-shell"
import { fetchChapter, type ChapterData } from "@/lib/api/komik"
import { komikChapterRoute, komikDetailRoute } from "@/lib/utils/routes"

export const Route = createFileRoute("/komik/chapter/$slug")({
  component: () => {
    const { slug } = Route.useParams()

    if (!slug) notFound()

    const { data, isLoading, error } = useQuery<ChapterData>({
      queryKey: ["komik-chapter", slug],
      queryFn: () => fetchChapter(slug),
      enabled: Boolean(slug),
    })

    if (error) notFound()
    usePageLoadingOverlay({ isLoading, label: "DECODING PAGES" })

    if (isLoading) return null
    if (!data) notFound()

    const chapterData = data!
    let listSlug = chapterData.list_chapter
    if (listSlug.endsWith("/")) listSlug = listSlug.slice(0, -1)
    const parts = listSlug.split("/")
    const komikId = parts[parts.length - 1]

    return (
      <>
        <Helmet><title>{chapterData.title}</title></Helmet>
        <MediaChapterShell
          title={chapterData.title}
          backHref={komikDetailRoute(komikId)}
          prevHref={chapterData.prev_chapter_id ? komikChapterRoute(chapterData.prev_chapter_id) : undefined}
          nextHref={chapterData.next_chapter_id ? komikChapterRoute(chapterData.next_chapter_id) : undefined}
          chapterImageUrls={chapterData.images ?? []}
        />
      </>
    )
  },
})
