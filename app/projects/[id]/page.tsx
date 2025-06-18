'use client'

import { useState } from 'react'
import AppLayout from '@/app/components/layout/AppLayout'
import ProjectCard from '@/app/components/projects/ProjectCard'
import TaskList from '@/app/components/tasks/TaskList'
import TaskForm from '@/app/components/forms/TaskForm'
import ProjectSuggestions from '@/app/components/ai/ProjectSuggestions'
import TaskAnalysis from '@/app/components/ai/TaskAnalysis'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import { useProjects } from '@/lib/hooks/useProjects'
import { useTasks } from '@/lib/hooks/useTasks'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { CreateTask } from '@/types'

interface ProjectPageProps {
  params: { id: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const { currentProject, fetchProject } = useProjects()
  const { createTask, tasks } = useTasks(params.id)

  const handleCreateTask = async (data: CreateTask) => {
    await createTask(data)
    setIsTaskModalOpen(false)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setIsTaskModalOpen(true)
    // Pre-fill the form with the suggestion
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Details</h1>
              <p className="text-gray-600">Manage project tasks and progress</p>
            </div>
          </div>
          
          <Button onClick={() => setIsTaskModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ProjectCard projectId={params.id} />
            
            {currentProject && (
              <ProjectSuggestions
                projectName={currentProject.name}
                projectDescription={currentProject.description || undefined}
                onSuggestionSelect={handleSuggestionSelect}
              />
            )}
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Tasks</h2>
              <TaskList projectId={params.id} />
            </div>

            {currentProject && tasks.length > 0 && (
              <TaskAnalysis project={currentProject} tasks={tasks} />
            )}
          </div>
        </div>

        <Modal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          title="Create New Task"
          size="lg"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsTaskModalOpen(false)}
            projectId={params.id}
          />
        </Modal>
      </div>
    </AppLayout>
  )
}