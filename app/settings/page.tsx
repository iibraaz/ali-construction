import { Metadata } from 'next'
import AppLayout from '@/app/components/layout/AppLayout'
import SettingsForm from '@/app/components/forms/SettingsForm'

export const metadata: Metadata = {
  title: 'Settings - Ali Construction',
  description: 'Manage your account settings',
}

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>

        <div className="max-w-2xl">
          <SettingsForm />
        </div>
      </div>
    </AppLayout>
  )
}