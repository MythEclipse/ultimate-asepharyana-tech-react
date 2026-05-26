import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/hooks/use-theme"
import { QueryProvider } from "@/components/providers/query-provider"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { HelmetProvider } from "@/components/providers/helmet-provider"
import { App } from "./App"
import "./styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <QueryProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </QueryProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
)
