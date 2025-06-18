import { Metadata } from 'next'
import AppLayout from '@/app/components/layout/AppLayout'
import ProjectCard from '@/app/components/projects/ProjectCard'
import TaskList from '@/app/components/tasks/TaskList'
import Button from '@/app/components/ui/Button'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProjectPageProps {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'Project Details - Ali Construction',
  description: 'View and manage project details',
}

export default function ProjectPage({ params }: ProjectPageProps) {
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
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProjectCard projectId={params.id} />
          </div>
          
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Tasks</h2>
              <TaskList projectId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}