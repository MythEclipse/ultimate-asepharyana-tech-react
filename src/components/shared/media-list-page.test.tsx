import { describe, expect, it, vi } from "vitest"
import { renderToString } from "react-dom/server"

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string }) => <a href={to} {...props}>{children}</a>,
}))

import { MediaListPage } from "./media-list-page"

const hero = {
  title: "ONGOING",
  accent: "ANIME",
  description: "List of currently airing anime.",
  accentTextClass: "text-primary",
  tagClass: "bg-primary/10 border border-primary/20 text-primary",
  introText: "Ongoing",
  colorClass: "border-primary/20",
  linkTextClass: "text-primary",
}

describe("MediaListPage", () => {
  it("renders list data without pagination instead of crashing", () => {
    expect(() =>
      renderToString(
        <MediaListPage
          isLoading={false}
          data={{ data: [{ title: "Anime" }], pagination: undefined } as any}
          error={null}
          queryName="ONGOING ANIME"
          itemRenderer={(item: { title: string }) => <div>{item.title}</div>}
          variant="primary"
          baseUrl="/anime/ongoing-anime"
          hubLink="/anime"
          hero={hero}
        />,
      ),
    ).not.toThrow()
  })
})
