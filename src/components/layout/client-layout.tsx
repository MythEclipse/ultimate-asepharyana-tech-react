"use client"


import { useRouter } from "@tanstack/react-router"
import { ThemeProvider } from "@/hooks/use-theme"
import { useState, useEffect } from "react"

import { useLoadingOverlayState } from "@/components/providers/loading-provider"
import { GlobalBackground } from "@/components/ui/global-background"
import { PageLoadingOverlay } from "@/components/ui/page-loading-overlay"
import { useIsMounted } from "@/lib/hooks/use-mounted"

import { Footer } from "./footer"
import { Navbar } from "./navbar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [pathname, setPathname] = useState(router.state.location.pathname)

  useEffect(() => {
    const unsubscribe = router.subscribe("onResolved", () => {
      setPathname(router.state.location.pathname)
    })
    return unsubscribe
  }, [router])
  const mounted = useIsMounted()
  const { show, label } = useLoadingOverlayState()

  return (
    <ThemeProvider>
      <GlobalBackground />
      <div className="min-h-screen flex flex-col text-foreground selection:bg-primary/30 selection:text-foreground relative z-10">
        <Navbar />

        <main key={mounted ? pathname : ""} className="relative flex-1 flex flex-col w-full">
          {children}
        </main>

        <Footer />

        <PageLoadingOverlay show={show} label={label ?? "LOADING"} />
      </div>
    </ThemeProvider>
  )
}
