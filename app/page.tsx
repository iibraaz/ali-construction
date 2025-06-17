export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Ali Construction
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Project Management System
        </p>
        <div className="space-y-4">
          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}