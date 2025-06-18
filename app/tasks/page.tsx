'use client'

import { useState } from 'react'
import AppLayout from '@/app/components/layout/AppLayout'
import TaskList from '@/app/components/tasks/TaskList'
import TaskForm from '@/app/components/forms/TaskForm'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import { useTasks } from '@/lib/hooks/useTasks'
import { useProjects } from '@/lib/hooks/useProjects'
import { Plus } from 'lucide-react'
import type { CreateTask } from '@/types'

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { createTask } = useTasks()
  const { projects } = useProjects()

  const handleCreateTask = async (data: CreateTask) => {
    await createTask(data)
    setIsModalOpen(false)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600">Manage and track all your tasks</p>
          </div>
          
          <Button onClick={() => setIsModalOpen(true)} disabled={projects.length === 0}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You need to create a project first before adding tasks.</p>
            <Button>Create Your First Project</Button>
          </div>
        ) : (
          <TaskList />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Task"
          size="lg"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </AppLayout>
  )
}