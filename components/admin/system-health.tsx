"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function SystemHealth() {
  const healthMetrics = [
    { name: "CPU Usage", value: 45, status: "good" },
    { name: "Memory Usage", value: 68, status: "warning" },
    { name: "Disk Usage", value: 32, status: "good" },
    { name: "Database Performance", value: 92, status: "excellent" },
    { name: "API Response Time", value: 85, status: "good" },
    { name: "User Sessions", value: 78, status: "good" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-green-500"
    if (value >= 70) return "bg-blue-500"
    if (value >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      {healthMetrics.map((metric) => (
        <div key={metric.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{metric.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{metric.value}%</span>
              <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
            </div>
          </div>
          <Progress value={metric.value} className="h-2" />
        </div>
      ))}
    </div>
  )
}
