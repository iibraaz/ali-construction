'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import ProjectForm from '@/app/components/forms/ProjectForm'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import { useProjects } from '@/lib/hooks/useProjects'
import { formatDate } from '@/lib/utils'
import { Calendar, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { Project, UpdateProject } from '@/types'

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
  const { projects, isLoading, updateProject, deleteProject } = useProjects()
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showActions, setShowActions] = useState<string | null>(null)

  const displayProjects = limit ? projects.slice(0, limit) : projects

  const handleUpdateProject = async (data: UpdateProject) => {
    if (editingProject) {
      await updateProject(editingProject.id, data)
      setEditingProject(null)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      await deleteProject(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!displayProjects.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 mb-4">No projects found</p>
          <p className="text-sm text-gray-400">Create your first project to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
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
                
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowActions(showActions === project.id ? null : project.id)}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  
                  {showActions === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setEditingProject(project)
                            setShowActions(null)
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteProject(project.id)
                            setShowActions(null)
                          }}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
        size="lg"
      >
        {editingProject && (
          <ProjectForm
            onSubmit={handleUpdateProject}
            onCancel={() => setEditingProject(null)}
            initialData={editingProject}
          />
        )}
      </Modal>
    </>
  )
}