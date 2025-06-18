import { SignIn as ClerkSignIn } from '@clerk/nextjs'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Ali Construction
          </h1>
          <p className="text-gray-600 mt-2">
            Sign in to your account
          </p>
        </div>
        <ClerkSignIn 
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