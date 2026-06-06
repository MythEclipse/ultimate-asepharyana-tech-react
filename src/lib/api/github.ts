export interface GitHubContribution {
  date: string
  count: number
}

export interface GitHubStatsResponse {
  contributions: GitHubContribution[]
  totalContributions: number
  languages: { axis: string; value: number; label: string }[]
  error?: string
}

const ELYSIA_URL = import.meta.env.VITE_ELYSIA_URL || "https://elysia.asepharyana.my.id"

export async function fetchGitHubStats(_username: string, options: { forceFetch?: boolean } = {}): Promise<GitHubStatsResponse> {
  const url = new URL(`${ELYSIA_URL}/github/stats`)
  if (options.forceFetch) url.searchParams.set("force", "true")

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`GitHub stats fetch failed: ${response.status}`)
  }
  return response.json()
}
