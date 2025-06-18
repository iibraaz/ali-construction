'use client'

import { Card, CardContent } from '@/app/components/ui/Card'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import { useDashboard } from '@/lib/hooks/useDashboard'
import { formatRelativeTime } from '@/lib/utils'
import { 
  FolderPlus, 
  CheckCircle, 
  UserPlus, 
  FileEdit 
} from 'lucide-react'

const activityIcons = {
  project_created: FolderPlus,
  task_completed: CheckCircle,
  task_assigned: UserPlus,
  project_updated: FileEdit,
}

const activityColors = {
  project_created: 'text-blue-600 bg-blue-100',
  task_completed: 'text-green-600 bg-green-100',
  task_assigned: 'text-purple-600 bg-purple-100',
  project_updated: 'text-orange-600 bg-orange-100',
}

export default function RecentActivity() {
  const { stats, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    )
  }

  if (!stats?.recentActivity?.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No recent activity</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => {
            const Icon = activityIcons[activity.type]
            const colorClasses = activityColors[activity.type]
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${colorClasses}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}