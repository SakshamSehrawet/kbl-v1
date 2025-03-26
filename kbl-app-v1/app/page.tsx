"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Trophy, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import LeaderboardTable from "@/components/leaderboard-table"
import MatchSchedule from "@/components/match-schedule"
import TeamPerformance from "@/components/team-performance"
import { ThemeToggle } from "@/components/theme-toggle"
import { LastUpdatedIndicator } from "@/components/last-updated-indicator"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="hidden md:inline-block font-bold text-xl">KUCHBHI IPL 2025 DREAM11 LEAGUE</span>
            <span className="md:hidden font-bold text-xl">IPL 2025</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Link href="https://github.com/yourusername/ipl-fantasy-dashboard" target="_blank">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                IPL 2025 Dream11 Fantasy League
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Track your team's performance, view the leaderboard, and stay updated with match schedules.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12" id="dashboard">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="leaderboard" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="leaderboard" className="text-sm sm:text-base">
                Leaderboard
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-sm sm:text-base">
                Team Performance
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-sm sm:text-base">
                Match Schedule
              </TabsTrigger>
            </TabsList>
            <TabsContent value="leaderboard" className="mt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-3 team-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                        Current Standings
                      </CardTitle>
                      <LastUpdatedIndicator />
                    </div>
                    <CardDescription>Updated leaderboard showing the current standings of all teams.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<LeaderboardSkeleton />}>
                      <LeaderboardTable />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="performance" className="mt-6">
              <Card className="team-card">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Detailed performance of each team across all matches.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<PerformanceSkeleton />}>
                    <TeamPerformance />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="schedule" className="mt-6">
              <Card className="team-card">
                <CardHeader>
                  <CardTitle>Match Schedule</CardTitle>
                  <CardDescription>Complete schedule of IPL 2025 matches.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<ScheduleSkeleton />}>
                    <MatchSchedule />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KUCHBHI IPL 2025 DREAM11 LEAGUE. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/about">About</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        ))}
    </div>
  )
}

function PerformanceSkeleton() {
  return (
    <div className="space-y-4">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-1/4 rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        ))}
    </div>
  )
}

function ScheduleSkeleton() {
  return (
    <div className="space-y-4">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
          </div>
        ))}
    </div>
  )
}

