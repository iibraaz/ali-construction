import { NextRequest, NextResponse } from 'next/server'
import { generateResponse } from '@/lib/ai'
import { z } from 'zod'

const ChatCommandSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  context: z.object({
    projectId: z.string().optional(),
    userId: z.string().optional(),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context } = ChatCommandSchema.parse(body)

    // Generate AI response
    const aiResponse = await generateResponse(message)

    return NextResponse.json({
      success: true,
      data: {
        response: aiResponse,
        timestamp: new Date().toISOString(),
        context,
      },
    })
  } catch (error) {
    console.error('Chat command error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Chat command endpoint is operational',
    endpoints: {
      POST: 'Send a chat message for AI processing',
    },
  })
}