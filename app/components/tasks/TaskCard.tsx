'use client'

import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { Calendar, MoreHorizontal, Clock } from 'lucide-react'
import type { Task } from '@/types'

interface TaskCardProps {
  task: Task
}

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
}

const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  completed: 'Completed',
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export default function TaskCard({ task }: TaskCardProps) {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed'

  return (
    <Card className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                {statusLabels[task.status]}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                {priorityLabels[task.priority]}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Created {formatDate(task.created_at)}
          </div>
          {task.due_date && (
            <div className={`flex items-center ${isOverdue ? 'text-red-600' : ''}`}>
              <Clock className="w-3 h-3 mr-1" />
              Due {formatDate(task.due_date)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}