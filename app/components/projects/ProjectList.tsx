'use client'

import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import { useProjects } from '@/lib/hooks/useProjects'
import { formatDate } from '@/lib/utils'
import { Calendar, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

interface ProjectListProps {
  limit?: number
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

export default function ProjectList({ limit }: ProjectListProps) {
  const { projects, isLoading } = useProjects()

  const displayProjects = limit ? projects.slice(0, limit) : projects

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!displayProjects.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No projects found</p>
          <Button className="mt-4">Create Your First Project</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {displayProjects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 cursor-pointer">
                      {project.name}
                    </h3>
                  </Link>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </div>
                
                {project.description && (
                  <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                )}
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created {formatDate(project.created_at)}
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}