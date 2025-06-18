import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Ali Construction</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome back!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard</h2>
              <p className="text-gray-600">Your construction project management dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}