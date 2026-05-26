"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "@tanstack/react-router"

const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID

function trackPageView(url: string, title: string) {
  if (!ANALYTICS_ID) return
  // Track page view here
  console.debug("[Analytics] Page view:", { url, title })
}

function trackEvent(event: { action: string; category: string; label: string }) {
  if (!ANALYTICS_ID) return
  // Track event here
  console.debug("[Analytics] Event:", event)
}

export function useAnalytics() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = router.subscribe("onResolved", () => {
      const pathname = router.state.location.pathname
      const search = router.state.location.search as Record<string, string>
      const searchStr = search && Object.keys(search).length > 0 ? `?${new URLSearchParams(search).toString()}` : ""
      trackPageView(pathname + searchStr, document.title)
    })
    return () => unsubscribe()
  }, [router])

  const trackClick = useCallback(
    (element: string, action = "click") => {
      trackEvent({ action, category: "engagement", label: element })
    },
    []
  )

  return { trackClick, trackEvent, trackPageView }
}
