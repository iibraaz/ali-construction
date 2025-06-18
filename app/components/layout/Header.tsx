'use client'

import { Menu } from 'lucide-react'
import { useUIStore } from '@/lib/store'
import UserButton from '@/app/components/auth/UserButton'

export default function Header() {
  const { setSidebarOpen } = useUIStore()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </header>
  )
}