"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchGitHubStats, type GitHubStatsResponse } from "@/lib/api/github"

export function useGitHubStats() {
  return useQuery<GitHubStatsResponse>({
    queryKey: ["github-stats"],
    queryFn: () => fetchGitHubStats("MythEclipse"),
    staleTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
