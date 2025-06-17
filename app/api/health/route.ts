import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    ]

    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !process.env[envVar]
    )

    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'not_configured',
        ai: process.env.OPENAI_API_KEY ? 'configured' : 'not_configured',
        email: process.env.SENDGRID_API_KEY ? 'configured' : 'not_configured',
        auth: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'configured' : 'not_configured',
      },
      missingEnvVars: missingEnvVars.length > 0 ? missingEnvVars : undefined,
    }

    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}