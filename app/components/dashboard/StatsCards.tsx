'use client'

import { Card, CardContent } from '@/app/components/ui/Card'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import { useDashboard } from '@/lib/hooks/useDashboard'
import { FolderOpen, Activity, CheckCircle, AlertCircle } from 'lucide-react'

export default function StatsCards() {
  const { stats, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex justify-center">
              <LoadingSpinner size="lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  const cards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Completed Tasks',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Overdue Tasks',
      value: stats.overdueTasks,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}