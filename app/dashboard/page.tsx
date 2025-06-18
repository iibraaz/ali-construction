import { Metadata } from 'next'
import AppLayout from '@/app/components/layout/AppLayout'
import StatsCards from '@/app/components/dashboard/StatsCards'
import RecentActivity from '@/app/components/dashboard/RecentActivity'
import ProjectList from '@/app/components/projects/ProjectList'

export const metadata: Metadata = {
  title: 'Dashboard - Ali Construction',
  description: 'Construction project management dashboard',
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
            <ProjectList limit={5} />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}