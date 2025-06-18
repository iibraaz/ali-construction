'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateProjectSchema, type CreateProject } from '@/types'
import Button from '@/app/components/ui/Button'
import Input from '@/app/components/ui/Input'
import FormField from '@/app/components/ui/FormField'

interface ProjectFormProps {
  onSubmit: (data: CreateProject) => Promise<void>
  onCancel?: () => void
  initialData?: Partial<CreateProject>
  isLoading?: boolean
}

export default function ProjectForm({ 
  onSubmit, 
  onCancel, 
  initialData,
  isLoading = false 
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProject>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField error={errors.name?.message}>
        <Input
          label="Project Name"
          placeholder="Enter project name"
          {...register('name')}
        />
      </FormField>

      <FormField error={errors.description?.message}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows={4}
          placeholder="Enter project description"
          {...register('description')}
        />
      </FormField>

      <FormField error={errors.status?.message}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          {...register('status')}
        >
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>
      </FormField>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isLoading}>
          {initialData ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}