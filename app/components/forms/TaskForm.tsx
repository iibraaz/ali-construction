'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTaskSchema, type CreateTask } from '@/types'
import Button from '@/app/components/ui/Button'
import Input from '@/app/components/ui/Input'
import FormField from '@/app/components/ui/FormField'

interface TaskFormProps {
  onSubmit: (data: CreateTask) => Promise<void>
  onCancel?: () => void
  initialData?: Partial<CreateTask>
  isLoading?: boolean
  projectId?: string
}

export default function TaskForm({ 
  onSubmit, 
  onCancel, 
  initialData,
  isLoading = false,
  projectId 
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTask>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      ...initialData,
      project_id: projectId || initialData?.project_id,
    },
  })

  const handleFormSubmit = async (data: CreateTask) => {
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormField error={errors.title?.message}>
        <Input
          label="Task Title"
          placeholder="Enter task title"
          {...register('title')}
        />
      </FormField>

      <FormField error={errors.description?.message}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows={3}
          placeholder="Enter task description"
          {...register('description')}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField error={errors.status?.message}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            {...register('status')}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </FormField>

        <FormField error={errors.priority?.message}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            {...register('priority')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </FormField>
      </div>

      <FormField error={errors.due_date?.message}>
        <Input
          label="Due Date"
          type="datetime-local"
          {...register('due_date')}
        />
      </FormField>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isSubmitting || isLoading}>
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  )
}