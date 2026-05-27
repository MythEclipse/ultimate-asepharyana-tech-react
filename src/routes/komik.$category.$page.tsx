import { createFileRoute, notFound } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { KomikListPage } from "@/components/komik/komik-list-page"
import { getKomikCategoryConfig, parseKomikCategoryParam } from "@/lib/utils/komik-routes"

export const Route = createFileRoute("/komik/$category/$page")({
  component: () => {
    const { category, page } = Route.useParams()
    const parsedCategory = parseKomikCategoryParam(category)

    if (!parsedCategory) notFound()

    const safeCategory = parsedCategory!
    const config = getKomikCategoryConfig(safeCategory)
    const pageNum = parseInt(page, 10)
    const categoryLabel = safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)
    const title = `${categoryLabel} - Page ${isNaN(pageNum) ? 1 : pageNum}`

    return (
      <>
        <Helmet><title>{title}</title></Helmet>
        <KomikListPage page={isNaN(pageNum) ? 1 : pageNum} fetchFn={config.fetchFn} queryKeyBase={config.queryKeyBase} baseUrl={config.baseUrl} variant={safeCategory} heroExpose={config.hero} />
      </>
    )
  },
})
