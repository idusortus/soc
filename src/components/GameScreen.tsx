import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <button
          onClick={onReset}
          className="text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-150 font-medium"
        >
          ← Back
        </button>
        <h1 className="font-bold text-gray-900 text-lg">Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-gray-600 text-sm py-3 px-4 font-medium">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 text-center py-3 font-bold text-sm shadow-sm animate-[bounce_0.5s_ease-out]">
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
