'use client'

import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TaskCard from './TaskCard'
import { useTasks } from '@/lib/hooks/useTasks'

interface TaskListProps {
  projectId?: string
  limit?: number
}

export default function TaskList({ projectId, limit }: TaskListProps) {
  const { tasks, isLoading } = useTasks(projectId)

  const displayTasks = limit ? tasks.slice(0, limit) : tasks

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!displayTasks.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No tasks found</p>
          <Button className="mt-4">Create Your First Task</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {displayTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}