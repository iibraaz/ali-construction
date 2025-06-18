import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  children: ReactNode
  className?: string
  error?: string
}

export default function FormField({ children, className, error }: FormFieldProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}