import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

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
          <a 
            href="/sign-up" 
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          
          <a 
            href="/sign-in" 
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors"
          >
            Sign In
          </a>
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