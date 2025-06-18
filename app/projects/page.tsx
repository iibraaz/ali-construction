import { Metadata } from 'next'
import AppLayout from '@/app/components/layout/AppLayout'
import ProjectList from '@/app/components/projects/ProjectList'
import Button from '@/app/components/ui/Button'
import { Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects - Ali Construction',
  description: 'Manage your construction projects',
}

export default function ProjectsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Manage and track your construction projects</p>
          </div>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <ProjectList />
      </div>
    </AppLayout>
  )
}