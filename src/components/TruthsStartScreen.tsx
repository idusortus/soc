interface TruthsStartScreenProps {
  onStart: () => void;
}

export function TruthsStartScreen({ onStart }: TruthsStartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Two Truths & A Lie</h1>
        <p className="text-lg text-gray-600 mb-8">Can you spot the lie?</p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="font-semibold text-gray-800 mb-3">How to play</h2>
          <ul className="text-left text-gray-600 text-sm space-y-2">
            <li>• Read three statements about a person</li>
            <li>• Two statements are TRUE, one is a LIE</li>
            <li>• Tap the statement you think is the lie</li>
            <li>• Find people at the event who match the profiles!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-purple-600 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
