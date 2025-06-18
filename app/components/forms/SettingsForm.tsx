'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Input from '@/app/components/ui/Input'
import FormField from '@/app/components/ui/FormField'

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement settings update logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField>
              <Input
                label="Display Name"
                placeholder="Enter your display name"
                defaultValue="John Doe"
              />
            </FormField>

            <FormField>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                defaultValue="john@example.com"
                disabled
              />
            </FormField>

            <Button type="submit" loading={isLoading}>
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </FormField>

            <FormField>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Email notifications
                </span>
              </label>
            </FormField>

            <Button>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}