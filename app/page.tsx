import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Button from '@/app/components/ui/Button'

export default function HomePage() {
  const { userId } = auth()
  
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ali Construction
          </h1>
          <p className="text-gray-600">
            Professional Project Management System
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/sign-up" className="block">
            <Button className="w-full">
              Get Started
            </Button>
          </Link>
          
          <Link href="/sign-in" className="block">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
            <div>
              <div className="font-semibold text-gray-900">Projects</div>
              <div>Manage</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Tasks</div>
              <div>Track</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">AI</div>
              <div>Optimize</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}