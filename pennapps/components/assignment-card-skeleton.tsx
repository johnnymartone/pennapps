"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function AssignmentCardSkeleton() {
  return (
    <Card className="shadow-md bg-white/70 backdrop-blur ring-1 ring-gray-200">
      <CardHeader className="pb-3">
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <span className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="h-2 bg-gray-200 rounded-full animate-pulse w-1/2" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}


