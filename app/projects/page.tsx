'use client'

import { useState } from 'react'
import AppLayout from '@/app/components/layout/AppLayout'
import ProjectList from '@/app/components/projects/ProjectList'
import ProjectForm from '@/app/components/forms/ProjectForm'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import { useProjects } from '@/lib/hooks/useProjects'
import { Plus } from 'lucide-react'
import type { CreateProject } from '@/types'

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { createProject } = useProjects()

  const handleCreateProject = async (data: CreateProject) => {
    await createProject(data)
    setIsModalOpen(false)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Manage and track your construction projects</p>
          </div>
          
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <ProjectList />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Project"
          size="lg"
        >
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </AppLayout>
  )
}