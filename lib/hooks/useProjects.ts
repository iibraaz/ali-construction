'use client'

import { useState, useEffect } from 'react'
import { useProjectsStore } from '@/lib/store'
import { showToast } from '@/app/components/ui/Toast'
import type { Project, CreateProject, UpdateProject } from '@/types'

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
      const response = await fetch('/api/projects')
      const result = await response.json()
      
      if (result.success) {
        setProjects(result.data)
      } else {
        throw new Error(result.error)
      }
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
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        addProject(result.data)
        showToast.dismiss(loadingToast)
        showToast.success('Project created successfully!')
        return result.data
      } else {
        throw new Error(result.error)
      }
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
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        updateProject(id, result.data)
        showToast.dismiss(loadingToast)
        showToast.success('Project updated successfully!')
        return result.data
      } else {
        throw new Error(result.error)
      }
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
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        deleteProject(id)
        showToast.dismiss(loadingToast)
        showToast.success('Project deleted successfully!')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to delete project')
      console.error('Failed to delete project:', error)
      throw error
    }
  }

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`)
      const result = await response.json()
      
      if (result.success) {
        setCurrentProject(result.data)
        return result.data
      } else {
        throw new Error(result.error)
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