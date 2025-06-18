'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import { useProjects } from '@/lib/hooks/useProjects'
import { formatDate } from '@/lib/utils'
import { Calendar, MoreHorizontal } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project?: Project
  projectId?: string
}

const statusColors = {
  planning: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  on_hold: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  planning: 'Planning',
  active: 'Active',
  completed: 'Completed',
  on_hold: 'On Hold',
}

export default function ProjectCard({ project: initialProject, projectId }: ProjectCardProps) {
  const { currentProject, fetchProject } = useProjects()
  const [project, setProject] = useState<Project | null>(initialProject || null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (projectId && !initialProject) {
      setIsLoading(true)
      fetchProject(projectId)
        .then(setProject)
        .finally(() => setIsLoading(false))
    } else if (initialProject) {
      setProject(initialProject)
    } else if (currentProject) {
      setProject(currentProject)
    }
  }, [projectId, initialProject, currentProject, fetchProject])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    )
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">Project not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${statusColors[project.status]}`}>
              {statusLabels[project.status]}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {project.description && (
          <p className="text-gray-600 mb-4">{project.description}</p>
        )}
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Created {formatDate(project.created_at)}
          </div>
          {project.updated_at !== project.created_at && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Updated {formatDate(project.updated_at)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}