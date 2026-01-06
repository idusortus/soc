import type { Profile } from '../types/truths';

interface GameScreenProps {
  profile: Profile;
  currentIndex: number;
  totalProfiles: number;
  showResult: boolean;
  guessedIndex: number | null;
  isLastProfile: boolean;
  onGuess: (statementIndex: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TruthsGameScreen({
  profile,
  currentIndex,
  totalProfiles,
  showResult,
  guessedIndex,
  isLastProfile,
  onGuess,
  onNext,
  onBack,
}: GameScreenProps) {
  const correctLieIndex = profile.statements.findIndex((s) => s.isLie);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
        >
          ← Quit
        </button>
        <div className="text-sm font-medium text-purple-600">
          {currentIndex + 1} / {totalProfiles}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">👤</div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-sm text-gray-500 mt-2">Which statement is the lie?</p>
            </div>

            <div className="space-y-3">
              {profile.statements.map((statement, index) => {
                const isGuessed = guessedIndex === index;
                const isCorrectLie = index === correctLieIndex;
                const showCorrect = showResult && isCorrectLie;
                const showWrong = showResult && isGuessed && !isCorrectLie;

                let buttonClasses =
                  'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                if (showCorrect) {
                  buttonClasses += 'bg-red-50 border-red-400 text-red-900';
                } else if (showWrong) {
                  buttonClasses += 'bg-gray-100 border-gray-400 text-gray-700';
                } else if (showResult) {
                  buttonClasses += 'bg-gray-50 border-gray-200 text-gray-600';
                } else {
                  buttonClasses +=
                    'bg-white border-purple-200 text-gray-700 hover:bg-purple-50 hover:border-purple-400 active:scale-95';
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && onGuess(index)}
                    disabled={showResult}
                    className={buttonClasses}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold flex-shrink-0">
                        {index + 1}.
                      </span>
                      <span className="flex-1">{statement.text}</span>
                      {showCorrect && (
                        <span className="text-red-500 flex-shrink-0 text-xl">❌</span>
                      )}
                      {showResult && !isCorrectLie && (
                        <span className="text-green-500 flex-shrink-0 text-xl">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showResult && (
            <div className="text-center">
              {guessedIndex === correctLieIndex ? (
                <p className="text-green-600 font-semibold mb-4 text-lg">
                  🎉 Correct! You spotted the lie!
                </p>
              ) : (
                <p className="text-orange-600 font-semibold mb-4 text-lg">
                  Not quite! Statement {correctLieIndex + 1} was the lie.
                </p>
              )}
              
              <button
                onClick={onNext}
                className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isLastProfile ? 'See Results' : 'Next Profile'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
