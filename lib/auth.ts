import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return userId
}

export async function getCurrentUser() {
  const user = await currentUser()
  return user
}

export async function getUserId() {
  const { userId } = auth()
  return userId
}

export function getAuthHeaders() {
  const { getToken } = auth()
  return {
    Authorization: `Bearer ${getToken()}`,
  }
}