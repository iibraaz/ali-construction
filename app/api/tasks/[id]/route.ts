import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { UpdateTaskSchema } from '@/types'
import { z } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: task, error } = await supabase
      .from('tasks')
      .select(`
        *,
        projects!inner(user_id)
      `)
      .eq('id', params.id)
      .eq('projects.user_id', userId)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error('Task GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch task' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = UpdateTaskSchema.parse(body)

    const { data: task, error } = await supabase
      .from('tasks')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select(`
        *,
        projects!inner(user_id)
      `)
      .eq('projects.user_id', userId)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error('Task PUT error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', params.id)
      .select(`
        projects!inner(user_id)
      `)
      .eq('projects.user_id', userId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    console.error('Task DELETE error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}