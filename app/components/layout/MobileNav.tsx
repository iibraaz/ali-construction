'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Settings 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center py-2 px-1 text-xs font-medium",
                isActive
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}