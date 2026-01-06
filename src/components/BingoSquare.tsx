import { memo } from 'react';
import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export const BingoSquare = memo(function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border rounded-lg transition-all duration-200 select-none min-h-[60px] text-xs leading-tight font-medium';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400 text-amber-900 shadow-md shadow-amber-300/50 scale-[1.02]'
      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-marked-border text-green-900 shadow-sm'
    : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-95 border-gray-300';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-sm bg-gradient-to-br from-blue-50 to-indigo-50 border-primary' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <>
          <span className="absolute top-0.5 right-0.5 text-green-600 text-xs">✓</span>
          {square.personName && (
            <span className="absolute bottom-0.5 left-0.5 right-0.5 text-green-700 text-[10px] font-medium truncate">
              {square.personName}
            </span>
          )}
        </>
      )}
    </button>
  );
});
