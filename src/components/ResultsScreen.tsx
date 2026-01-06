interface ResultsScreenProps {
  score: number;
  totalProfiles: number;
  onPlayAgain: () => void;
  onBackHome: () => void;
}

export function ResultsScreen({
  score,
  totalProfiles,
  onPlayAgain,
  onBackHome,
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalProfiles) * 100);
  
  let message = '';
  let emoji = '';
  
  if (percentage === 100) {
    message = 'Perfect! You spotted every lie!';
    emoji = '🏆';
  } else if (percentage >= 75) {
    message = 'Great job! You have a good eye!';
    emoji = '⭐';
  } else if (percentage >= 50) {
    message = 'Not bad! Keep practicing!';
    emoji = '👍';
  } else {
    message = 'Keep trying! You\'ll get better!';
    emoji = '💪';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="text-center max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Game Over!</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Score</p>
            <p className="text-5xl font-bold text-purple-600 mb-1">
              {score}/{totalProfiles}
            </p>
            <p className="text-lg text-gray-700">{percentage}% Correct</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onBackHome}
              className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          💡 Try finding people at your event who match these profiles!
        </p>
      </div>
    </div>
  );
}
