'use client'

import { useState, useEffect } from 'react'
import { useProjectsStore } from '@/lib/store'
import { showToast } from '@/app/components/ui/Toast'
import type { Project, CreateProject, UpdateProject } from '@/types'

// Mock data for development
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Downtown Office Building',
    description: 'Modern 12-story office complex with sustainable features',
    status: 'active',
    user_id: 'user-1',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Residential Complex Phase 1',
    description: '50-unit residential development with amenities',
    status: 'planning',
    user_id: 'user-1',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Highway Bridge Renovation',
    description: 'Complete structural renovation of the Main St bridge',
    status: 'completed',
    user_id: 'user-1',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function useProjects() {
  const {
    projects,
    currentProject,
    isLoading,
    setProjects,
    addProject,
    updateProject,
    deleteProject,
    setCurrentProject,
    setLoading,
  } = useProjectsStore()

  const fetchProjects = async () => {
    setLoading(true)
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800))
      setProjects(mockProjects)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      showToast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (data: CreateProject) => {
    const loadingToast = showToast.loading('Creating project...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newProject: Project = {
        id: Math.random().toString(36).substring(7),
        ...data,
        user_id: 'user-1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      addProject(newProject)
      showToast.dismiss(loadingToast)
      showToast.success('Project created successfully!')
      return newProject
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to create project')
      console.error('Failed to create project:', error)
      throw error
    }
  }

  const updateProjectById = async (id: string, data: UpdateProject) => {
    const loadingToast = showToast.loading('Updating project...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const updatedProject = {
        ...data,
        updated_at: new Date().toISOString(),
      }
      
      updateProject(id, updatedProject)
      showToast.dismiss(loadingToast)
      showToast.success('Project updated successfully!')
      return updatedProject
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to update project')
      console.error('Failed to update project:', error)
      throw error
    }
  }

  const deleteProjectById = async (id: string) => {
    const loadingToast = showToast.loading('Deleting project...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))
      
      deleteProject(id)
      showToast.dismiss(loadingToast)
      showToast.success('Project deleted successfully!')
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to delete project')
      console.error('Failed to delete project:', error)
      throw error
    }
  }

  const fetchProject = async (id: string) => {
    try {
      // Find project in mock data
      const project = mockProjects.find(p => p.id === id)
      if (project) {
        setCurrentProject(project)
        return project
      } else {
        throw new Error('Project not found')
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
      showToast.error('Failed to load project')
      throw error
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    currentProject,
    isLoading,
    fetchProjects,
    createProject,
    updateProject: updateProjectById,
    deleteProject: deleteProjectById,
    fetchProject,
    setCurrentProject,
  }
}