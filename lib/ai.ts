import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

if (!process.env.OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. AI features will be disabled.')
}

export async function generateResponse(prompt: string): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant for a construction project management system. Provide helpful, professional responses related to construction projects, tasks, and management.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || 'No response generated'
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate AI response')
  }
}

export async function generateProjectSuggestions(projectName: string, description?: string): Promise<string[]> {
  try {
    const prompt = `Given a construction project named "${projectName}"${description ? ` with description: "${description}"` : ''}, suggest 5 key tasks or milestones that should be included in this project. Return only the task names, one per line.`
    
    const response = await generateResponse(prompt)
    return response.split('\n').filter(line => line.trim()).slice(0, 5)
  } catch (error) {
    console.error('Error generating project suggestions:', error)
    return [
      'Site preparation and permits',
      'Foundation work',
      'Structural framework',
      'Utilities installation',
      'Final inspection and cleanup'
    ]
  }
}

export async function analyzeProjectProgress(projectData: {
  name: string
  totalTasks: number
  completedTasks: number
  overdueTasks: number
}): Promise<string> {
  try {
    const prompt = `Analyze this construction project progress:
Project: ${projectData.name}
Total Tasks: ${projectData.totalTasks}
Completed Tasks: ${projectData.completedTasks}
Overdue Tasks: ${projectData.overdueTasks}

Provide a brief analysis of the project status and any recommendations for improvement.`

    return await generateResponse(prompt)
  } catch (error) {
    console.error('Error analyzing project progress:', error)
    return 'Unable to analyze project progress at this time.'
  }
}