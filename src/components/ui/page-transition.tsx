import { useRouter } from "@tanstack/react-router"
import { useState, useEffect } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [pathname, setPathname] = useState(router.state.location.pathname)

  useEffect(() => {
    const unsubscribe = router.subscribe("onResolved", () => {
      setPathname(router.state.location.pathname)
    })
    return unsubscribe
  }, [router])

  return (
    <section key={pathname} className="w-full transition-all duration-300">
      {children}
    </section>
  )
}
