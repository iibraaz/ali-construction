'use client'

import { useState } from 'react'

export function useAI() {
  const [isLoading, setIsLoading] = useState(false)

  const generateProjectSuggestions = async (projectName: string, description?: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate 5 key tasks for a construction project named "${projectName}"${description ? ` with description: "${description}"` : ''}. Return only task names, one per line.`,
          context: { type: 'project_suggestions' },
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        const suggestions = result.data.response
          .split('\n')
          .filter((line: string) => line.trim())
          .slice(0, 5)
        return suggestions
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to generate project suggestions:', error)
      return [
        'Site preparation and permits',
        'Foundation work',
        'Structural framework',
        'Utilities installation',
        'Final inspection and cleanup'
      ]
    } finally {
      setIsLoading(false)
    }
  }

  const analyzeProject = async (projectData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Analyze this construction project: ${JSON.stringify(projectData)}. Provide insights and recommendations.`,
          context: { type: 'project_analysis' },
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        return result.data.response
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to analyze project:', error)
      return 'Unable to analyze project at this time.'
    } finally {
      setIsLoading(false)
    }
  }

  const chatWithAI = async (message: string, context?: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      })

      const result = await response.json()
      
      if (result.success) {
        return result.data.response
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Failed to chat with AI:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    generateProjectSuggestions,
    analyzeProject,
    chatWithAI,
  }
}