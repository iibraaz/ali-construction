import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Project, Task, User, DashboardStats } from '@/types'

// Auth Store
interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        setUser: (user) => set({ user }),
        setLoading: (isLoading) => set({ isLoading }),
        logout: () => set({ user: null }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)

// Projects Store
interface ProjectsState {
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (project: Project | null) => void
  setLoading: (loading: boolean) => void
}

export const useProjectsStore = create<ProjectsState>()(
  devtools((set, get) => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    setProjects: (projects) => set({ projects }),
    addProject: (project) => 
      set((state) => ({ projects: [...state.projects, project] })),
    updateProject: (id, updates) =>
      set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, ...updates } : p
        ),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...updates } 
          : state.currentProject
      })),
    deleteProject: (id) =>
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject
      })),
    setCurrentProject: (project) => set({ currentProject: project }),
    setLoading: (isLoading) => set({ isLoading }),
  }))
)

// Tasks Store
interface TasksState {
  tasks: Task[]
  isLoading: boolean
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setLoading: (loading: boolean) => void
  getTasksByProject: (projectId: string) => Task[]
}

export const useTasksStore = create<TasksState>()(
  devtools((set, get) => ({
    tasks: [],
    isLoading: false,
    setTasks: (tasks) => set({ tasks }),
    addTask: (task) => 
      set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (id, updates) =>
      set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === id ? { ...t, ...updates } : t
        )
      })),
    deleteTask: (id) =>
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
    setLoading: (isLoading) => set({ isLoading }),
    getTasksByProject: (projectId) => 
      get().tasks.filter((task) => task.project_id === projectId),
  }))
)

// Dashboard Store
interface DashboardState {
  stats: DashboardStats | null
  isLoading: boolean
  setStats: (stats: DashboardStats) => void
  setLoading: (loading: boolean) => void
}

export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    stats: null,
    isLoading: false,
    setStats: (stats) => set({ stats }),
    setLoading: (isLoading) => set({ isLoading }),
  }))
)

// UI Store
interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        sidebarOpen: true,
        theme: 'system',
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: 'ui-storage',
      }
    )
  )
)