'use client'

import { useUser } from '@clerk/nextjs'
import { useAuthStore } from '@/lib/store'
import { useEffect } from 'react'

export function useAuth() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser()
  const { user, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    if (isLoaded) {
      setLoading(false)
      
      if (isSignedIn && clerkUser) {
        const userData = {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
          avatar_url: clerkUser.imageUrl,
          created_at: clerkUser.createdAt?.toISOString() || new Date().toISOString(),
        }
        setUser(userData)
      } else {
        setUser(null)
      }
    } else {
      setLoading(true)
    }
  }, [isLoaded, isSignedIn, clerkUser, setUser, setLoading])

  return {
    user,
    isLoading: !isLoaded,
    isSignedIn,
  }
}