import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { CreateTaskSchema } from '@/types'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('project_id')

    let query = supabase
      .from('tasks')
      .select(`
        *,
        projects!inner(user_id)
      `)
      .eq('projects.user_id', userId)
      .order('created_at', { ascending: false })

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    const { data: tasks, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: tasks,
    })
  } catch (error) {
    console.error('Tasks GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreateTaskSchema.parse(body)

    // Verify project ownership
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('id', validatedData.project_id)
      .eq('user_id', userId)
      .single()

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found or access denied' },
        { status: 403 }
      )
    }

    const { data: task, error } = await supabase
      .from('tasks')
      .insert(validatedData)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error('Tasks POST error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    )
  }
}