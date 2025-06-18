'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import { useAI } from '@/lib/hooks/useAI'
import { Lightbulb, RefreshCw } from 'lucide-react'

interface ProjectSuggestionsProps {
  projectName: string
  projectDescription?: string
  onSuggestionSelect?: (suggestion: string) => void
}

export default function ProjectSuggestions({ 
  projectName, 
  projectDescription,
  onSuggestionSelect 
}: ProjectSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { generateProjectSuggestions, isLoading } = useAI()

  const handleGenerateSuggestions = async () => {
    try {
      const newSuggestions = await generateProjectSuggestions(projectName, projectDescription)
      setSuggestions(newSuggestions)
    } catch (error) {
      console.error('Failed to generate suggestions:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            AI Task Suggestions
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateSuggestions}
            loading={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Get AI-powered task suggestions for your project
            </p>
            <Button onClick={handleGenerateSuggestions} loading={isLoading}>
              Generate Suggestions
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-900">{suggestion}</span>
                {onSuggestionSelect && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSuggestionSelect(suggestion)}
                  >
                    Add Task
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}