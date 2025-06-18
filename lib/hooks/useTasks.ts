'use client'

import { useState, useEffect } from 'react'
import { useTasksStore } from '@/lib/store'
import type { Task, CreateTask, UpdateTask } from '@/types'

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
      const url = projectId ? `/api/tasks?project_id=${projectId}` : '/api/tasks'
      const response = await fetch(url)
      const result = await response.json()
      
      if (result.success) {
        setTasks(result.data)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (data: CreateTask) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        addTask(result.data)
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to create task:', error)
      throw error
    }
  }

  const updateTaskById = async (id: string, data: UpdateTask) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        updateTask(id, result.data)
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to update task:', error)
      throw error
    }
  }

  const deleteTaskById = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        deleteTask(id)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
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