interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent [.no-gradient_&]:text-primary mb-2 animate-[fade-in_0.6s_ease-out]">
          Soc Ops
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate-[fade-in_0.6s_ease-out_0.2s_backwards]">
          Social Bingo
        </p>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8 animate-[fade-in_0.6s_ease-out_0.4s_backwards] transition-transform hover:scale-[1.02]">
          <h2 className="font-semibold text-gray-800 mb-3">How to play</h2>
          <ul className="text-left text-gray-600 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Find people who match the questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Tap a square when you find a match</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Get 5 in a row to win!</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-primary text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 animate-[fade-in_0.6s_ease-out_0.6s_backwards]"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
