export function TruthsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Two Truths & A Lie</h1>
        <p className="text-gray-600 mb-6">
          This game is under construction. Coming soon!
        </p>
        <a
          href="/"
          className="inline-block bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-light transition-colors"
        >
          ← Back to Games
        </a>
      </div>
    </div>
  );
}
