'use client'

import { useState, useEffect } from 'react'
import { useDashboardStore } from '@/lib/store'
import type { DashboardStats } from '@/types'

export function useDashboard() {
  const { stats, isLoading, setStats, setLoading } = useDashboardStore()

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      // TODO: Create dashboard stats API endpoint
      // For now, we'll simulate the data
      const mockStats: DashboardStats = {
        totalProjects: 12,
        activeProjects: 8,
        completedTasks: 45,
        overdueTasks: 3,
        recentActivity: [
          {
            id: '1',
            type: 'task_completed',
            title: 'Foundation work completed',
            description: 'Downtown Office Building - Foundation pouring task marked as complete',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            user_id: 'user-1',
          },
          {
            id: '2',
            type: 'project_created',
            title: 'New project created',
            description: 'Residential Complex Phase 2 project has been created',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            user_id: 'user-1',
          },
          {
            id: '3',
            type: 'task_assigned',
            title: 'Task assigned',
            description: 'Electrical rough-in task assigned to John Smith',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            user_id: 'user-1',
          },
        ],
      }

      setStats(mockStats)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  return {
    stats,
    isLoading,
    fetchDashboardStats,
  }
}