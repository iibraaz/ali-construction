import { Metadata } from 'next'
import AppLayout from '@/app/components/layout/AppLayout'
import TaskList from '@/app/components/tasks/TaskList'
import Button from '@/app/components/ui/Button'
import { Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tasks - Ali Construction',
  description: 'Manage your construction tasks',
}

export default function TasksPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600">Manage and track all your tasks</p>
          </div>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        <TaskList />
      </div>
    </AppLayout>
  )
}