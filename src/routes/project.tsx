import { createFileRoute } from "@tanstack/react-router"
import { Helmet } from "react-helmet-async"
import { ProjectPageClient } from "@/components/home/project-page-client"

export const Route = createFileRoute("/project")({
  component: () => (
    <>
      <Helmet><title>Projects</title></Helmet>
      <ProjectPageClient />
    </>
  ),
})
