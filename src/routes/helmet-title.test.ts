import { describe, expect, it } from "vitest"

const routeModules = import.meta.glob("./*.tsx", { query: "?raw", import: "default", eager: true })

describe("Helmet route titles", () => {
  it("uses one string expression for dynamic title children", () => {
    const badTitles = Object.entries(routeModules).flatMap(([file, source]) =>
      [...String(source).matchAll(/<title>([\s\S]*?)<\/title>/g)]
        .filter(([, children]) => /}\s*[^<{\s]/.test(children) || /[^>}\s]\s*{/.test(children))
        .map(([, children]) => `${file}: ${children.trim()}`),
    )

    expect(badTitles).toEqual([])
  })
})
