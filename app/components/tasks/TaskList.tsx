'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Modal from '@/app/components/ui/Modal'
import TaskForm from '@/app/components/forms/TaskForm'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'
import { useTasks } from '@/lib/hooks/useTasks'
import { formatDate } from '@/lib/utils'
import { Calendar, MoreHorizontal, Clock, Edit, Trash2 } from 'lucide-react'
import type { Task, UpdateTask } from '@/types'

interface TaskListProps {
  projectId?: string
  limit?: number
}

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
}

const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  completed: 'Completed',
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export default function TaskList({ projectId, limit }: TaskListProps) {
  const { tasks, isLoading, updateTask, deleteTask } = useTasks(projectId)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showActions, setShowActions] = useState<string | null>(null)

  const displayTasks = limit ? tasks.slice(0, limit) : tasks

  const handleUpdateTask = async (data: UpdateTask) => {
    if (editingTask) {
      await updateTask(editingTask.id, data)
      setEditingTask(null)
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id)
    }
  }

  const handleStatusChange = async (task: Task, newStatus: Task['status']) => {
    await updateTask(task.id, { status: newStatus })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!displayTasks.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 mb-4">No tasks found</p>
          <p className="text-sm text-gray-400">Create your first task to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {displayTasks.map((task) => {
          const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed'
          
          return (
            <Card key={task.id} className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task, e.target.value as Task['status'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${statusColors[task.status]}`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                        {priorityLabels[task.priority]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowActions(showActions === task.id ? null : task.id)}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                    
                    {showActions === task.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setEditingTask(task)
                              setShowActions(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Task
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteTask(task.id)
                              setShowActions(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Task
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {task.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Created {formatDate(task.created_at)}
                  </div>
                  {task.due_date && (
                    <div className={`flex items-center ${isOverdue ? 'text-red-600' : ''}`}>
                      <Clock className="w-3 h-3 mr-1" />
                      Due {formatDate(task.due_date)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
        size="lg"
      >
        {editingTask && (
          <TaskForm
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            initialData={editingTask}
          />
        )}
      </Modal>
    </>
  )
}