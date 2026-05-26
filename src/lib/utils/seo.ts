export interface SeoData {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogUrl: string
  ogImage: string
  ogType: "website" | "article" | "profile"
  twitterCard: "summary_large_image"
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  canonicalUrl: string
}

interface SeoParams {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
}

const SITE_NAME = "Asep Haryana Portfolio"
const SITE_URL = "https://asepharyana.tech"
const DEFAULT_IMAGE = "/default.png"

export function createSeoData({
  title,
  description = "Crafting robust Backend systems with high-performance Frontend solutions to build seamless digital experiences.",
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}: SeoParams): SeoData {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`

  return {
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: fullUrl,
    ogImage: fullImage,
    ogType: type,
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: fullImage,
    canonicalUrl: fullUrl,
  }
}

export function getPageSeo(pathname: string): SeoData {
  const pages: Record<string, SeoParams> = {
    "/": { type: "website" },
    "/anime": { title: "Anime", description: "Watch anime online with high-quality streaming." },
    "/anime2": { title: "Anime2", description: "Watch anime online — source 2." },
    "/komik": { title: "Komik", description: "Read komik online including manga, manhwa, and manhua." },
    "/project": { title: "Projects", description: "Explore my portfolio of projects." },
    "/dashboard": { title: "Dashboard", description: "Personal dashboard." },
    "/settings": { title: "Settings", description: "Manage settings and preferences." },
  }
  const config = pages[pathname] || {}
  return createSeoData(config)
}
