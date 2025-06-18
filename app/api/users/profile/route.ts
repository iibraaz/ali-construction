import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const profile = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      avatar_url: user.imageUrl,
      created_at: user.createdAt,
    }

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error('Profile GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}