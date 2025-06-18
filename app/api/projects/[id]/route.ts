import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { UpdateProjectSchema } from '@/types'
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

    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Project GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
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
    const validatedData = UpdateProjectSchema.parse(body)

    const { data: project, error } = await supabase
      .from('projects')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Project PUT error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
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
      .from('projects')
      .delete()
      .eq('id', params.id)
      .eq('user_id', userId)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Project DELETE error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}