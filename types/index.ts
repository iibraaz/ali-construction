import { z } from 'zod'

// Project schemas
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().nullable(),
  status: z.enum(['planning', 'active', 'completed', 'on_hold']),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
})

export const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  status: z.enum(['planning', 'active', 'completed', 'on_hold']).default('planning'),
})

export const UpdateProjectSchema = CreateProjectSchema.partial()

// Task schemas
export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Task title is required'),
  description: z.string().nullable(),
  status: z.enum(['todo', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  project_id: z.string().uuid(),
  assigned_to: z.string().nullable(),
  due_date: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'completed']).default('todo'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  project_id: z.string().uuid(),
  assigned_to: z.string().optional(),
  due_date: z.string().optional(),
})

export const UpdateTaskSchema = CreateTaskSchema.partial()

// TypeScript types
export type Project = z.infer<typeof ProjectSchema>
export type CreateProject = z.infer<typeof CreateProjectSchema>
export type UpdateProject = z.infer<typeof UpdateProjectSchema>

export type Task = z.infer<typeof TaskSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Dashboard types
export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedTasks: number
  overdueTasks: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'project_created' | 'task_completed' | 'task_assigned' | 'project_updated'
  title: string
  description: string
  timestamp: string
  user_id: string
}

// User types
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}

// AI types
export interface AIResponse {
  content: string
  tokens_used: number
  model: string
}

export interface ProjectSuggestion {
  task: string
  priority: 'low' | 'medium' | 'high'
  estimated_duration: string
}