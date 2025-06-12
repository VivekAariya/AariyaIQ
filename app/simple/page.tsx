export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Aariya
            </span>
            <span className="text-cyan-400">IQ</span>
          </h1>

          <h2 className="text-2xl text-gray-300">Learning Intelligence. Leading with AI</h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A revolutionary learning platform powered by artificial intelligence, designed to transform how
            professionals acquire and apply knowledge.
          </p>

          <div className="space-y-4">
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-300">July 14th, 2025</p>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href="/?dev=true"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Preview Main Site
              </a>
              <a
                href="/debug"
                className="px-6 py-3 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Debug Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
