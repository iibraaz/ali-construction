'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import { useAI } from '@/lib/hooks/useAI'
import { BarChart3, RefreshCw } from 'lucide-react'
import type { Project, Task } from '@/types'

interface TaskAnalysisProps {
  project: Project
  tasks: Task[]
}

export default function TaskAnalysis({ project, tasks }: TaskAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>('')
  const { analyzeProject, isLoading } = useAI()

  const handleAnalyze = async () => {
    try {
      const projectData = {
        name: project.name,
        status: project.status,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed').length,
        inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
        overdueTasks: tasks.filter(t => 
          t.due_date && 
          new Date(t.due_date) < new Date() && 
          t.status !== 'completed'
        ).length,
        highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
      }

      const result = await analyzeProject(projectData)
      setAnalysis(result)
    } catch (error) {
      console.error('Failed to analyze project:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Project Analysis
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAnalyze}
            loading={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Analyze
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {!analysis ? (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Get AI insights about your project progress and recommendations
            </p>
            <Button onClick={handleAnalyze} loading={isLoading}>
              Analyze Project
            </Button>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{analysis}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}