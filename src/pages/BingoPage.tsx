import { useBingoGame } from '../hooks/useBingoGame';
import { StartScreen } from '../components/StartScreen';
import { GameScreen } from '../components/GameScreen';
import { BingoModal } from '../components/BingoModal';
import { NameInputModal } from '../components/NameInputModal';

export function BingoPage() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    pendingSquareId,
    startGame,
    handleSquareClick,
    handleNameSubmit,
    cancelNameInput,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} onPlayAgain={startGame} />
      )}
      {pendingSquareId !== null && (
        <NameInputModal
          questionText={board[pendingSquareId].text}
          onSubmit={handleNameSubmit}
          onCancel={cancelNameInput}
        />
      )}
    </>
  );
}
