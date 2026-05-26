import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { ActivitySection } from "@/components/home/activity-section"
import { CallToActionSection } from "@/components/home/cta-section"
import { HeroSection } from "@/components/home/hero-section"
import { TechArsenal } from "@/components/home/tech-arsenal"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Asep Haryana Saputra</title>
      </Helmet>
      <HeroSection />
      <TechArsenal />
      <ActivitySection />
      <CallToActionSection />
    </>
  )
}
