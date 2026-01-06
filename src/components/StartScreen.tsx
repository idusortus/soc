interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Soc Ops</h1>
        <p className="text-lg text-gray-600 mb-8">Social Bingo</p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="font-semibold text-gray-800 mb-3">How to play</h2>
          <ul className="text-left text-gray-600 text-sm space-y-2">
            <li>• Talk to others and find people who match each square</li>
            <li>• Tap a square when you meet someone who matches</li>
            <li>• Get 5 in a row (any direction) to win!</li>
            <li>• Center square is a FREE SPACE</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-accent text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-accent-light transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
