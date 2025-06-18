'use client'

import { useState, useEffect } from 'react'
import { useTasksStore } from '@/lib/store'
import { showToast } from '@/app/components/ui/Toast'
import type { Task, CreateTask, UpdateTask } from '@/types'

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Site preparation and excavation',
    description: 'Clear site and excavate foundation area',
    status: 'completed',
    priority: 'high',
    project_id: '1',
    assigned_to: null,
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Foundation pouring',
    description: 'Pour concrete foundation and basement walls',
    status: 'in_progress',
    priority: 'high',
    project_id: '1',
    assigned_to: null,
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Permit applications',
    description: 'Submit all required building permits',
    status: 'todo',
    priority: 'high',
    project_id: '2',
    assigned_to: null,
    due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Electrical rough-in',
    description: 'Install electrical conduits and wiring',
    status: 'todo',
    priority: 'medium',
    project_id: '1',
    assigned_to: null,
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Overdue
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function useTasks(projectId?: string) {
  const {
    tasks,
    isLoading,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setLoading,
    getTasksByProject,
  } = useTasksStore()

  const filteredTasks = projectId ? getTasksByProject(projectId) : tasks

  const fetchTasks = async () => {
    setLoading(true)
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 600))
      setTasks(mockTasks)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      showToast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (data: CreateTask) => {
    const loadingToast = showToast.loading('Creating task...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newTask: Task = {
        id: Math.random().toString(36).substring(7),
        ...data,
        assigned_to: data.assigned_to || null,
        due_date: data.due_date || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      addTask(newTask)
      showToast.dismiss(loadingToast)
      showToast.success('Task created successfully!')
      return newTask
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to create task')
      console.error('Failed to create task:', error)
      throw error
    }
  }

  const updateTaskById = async (id: string, data: UpdateTask) => {
    const loadingToast = showToast.loading('Updating task...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const updatedTask = {
        ...data,
        updated_at: new Date().toISOString(),
      }
      
      updateTask(id, updatedTask)
      showToast.dismiss(loadingToast)
      showToast.success('Task updated successfully!')
      return updatedTask
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to update task')
      console.error('Failed to update task:', error)
      throw error
    }
  }

  const deleteTaskById = async (id: string) => {
    const loadingToast = showToast.loading('Deleting task...')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      deleteTask(id)
      showToast.dismiss(loadingToast)
      showToast.success('Task deleted successfully!')
    } catch (error) {
      showToast.dismiss(loadingToast)
      showToast.error('Failed to delete task')
      console.error('Failed to delete task:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [projectId])

  return {
    tasks: filteredTasks,
    isLoading,
    fetchTasks,
    createTask,
    updateTask: updateTaskById,
    deleteTask: deleteTaskById,
  }
}