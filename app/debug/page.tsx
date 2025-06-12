export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Debug Page</h1>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Environment Check</h2>
            <ul className="space-y-2">
              <li>✅ React components loading</li>
              <li>✅ Tailwind CSS working</li>
              <li>✅ Next.js routing functional</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Navigation Test</h2>
            <div className="space-y-2">
              <a href="/" className="block text-blue-400 hover:text-blue-300">
                → Go to Home Page (/)
              </a>
              <a href="/launch-page" className="block text-blue-400 hover:text-blue-300">
                → Go to Launch Page (/launch-page)
              </a>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Component Test</h2>
            <p>If you can see this page, your Next.js app is working correctly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
