import { SignUp as ClerkSignUp } from '@clerk/nextjs'

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Ali Construction
          </h1>
          <p className="text-gray-600 mt-2">
            Create your account
          </p>
        </div>
        <ClerkSignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg",
            }
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}