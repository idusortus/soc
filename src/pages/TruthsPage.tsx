import { useNavigate } from 'react-router-dom';
import { useTruthsGame } from '../hooks/useTruthsGame';
import { TruthsStartScreen } from '../components/TruthsStartScreen';
import { TruthsGameScreen } from '../components/TruthsGameScreen';
import { ResultsScreen } from '../components/ResultsScreen';

export function TruthsPage() {
  const navigate = useNavigate();
  const {
    gameState,
    currentProfile,
    currentProfileIndex,
    totalProfiles,
    results,
    score,
    showResult,
    isLastProfile,
    startGame,
    makeGuess,
    nextProfile,
    resetGame,
  } = useTruthsGame();

  const handleBackHome = () => {
    navigate('/');
  };

  if (gameState === 'start') {
    return <TruthsStartScreen onStart={startGame} />;
  }

  if (gameState === 'results') {
    return (
      <ResultsScreen
        score={score}
        totalProfiles={totalProfiles}
        onPlayAgain={startGame}
        onBackHome={handleBackHome}
      />
    );
  }

  if (!currentProfile) {
    return null;
  }

  const lastResult = results[results.length - 1];
  const guessedIndex = showResult && lastResult
    ? lastResult.guessedStatementIndex
    : null;

  return (
    <TruthsGameScreen
      profile={currentProfile}
      currentIndex={currentProfileIndex}
      totalProfiles={totalProfiles}
      showResult={showResult}
      guessedIndex={guessedIndex}
      isLastProfile={isLastProfile}
      onGuess={makeGuess}
      onNext={nextProfile}
      onBack={resetGame}
    />
  );
}
