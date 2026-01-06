import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Soc Ops</h1>
          <p className="text-gray-600">Social games for mixers, coffee shops, and group gatherings</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/bingo"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Social Bingo</h2>
            <p className="text-gray-600 text-sm">
              Find people who match the squares and get 5 in a row! Perfect for breaking the ice.
            </p>
            <div className="mt-4 text-accent font-medium text-sm">Play Now →</div>
          </Link>

          <Link
            to="/truths"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-3xl mb-3">🤔</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Two Truths & A Lie</h2>
            <p className="text-gray-600 text-sm">
              Guess which statement is false about each person. Learn fun facts!
            </p>
            <div className="mt-4 text-accent font-medium text-sm">Play Now →</div>
          </Link>

          <Link
            to="/poll"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow opacity-50 pointer-events-none"
          >
            <div className="text-3xl mb-3">🗳️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Would You Rather</h2>
            <p className="text-gray-600 text-sm">
              Vote on dilemmas and debate with others who picked the same choice.
            </p>
            <div className="mt-4 text-gray-400 font-medium text-sm">Coming Soon</div>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-6 opacity-50">
            <div className="text-3xl mb-3">✨</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">More Games</h2>
            <p className="text-gray-600 text-sm">
              Additional social games coming soon. Have an idea? Share it with us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
