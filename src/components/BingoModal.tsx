import { useEffect, useRef } from 'react';

interface BingoModalProps {
  onDismiss: () => void;
  onPlayAgain?: () => void;
}

export function BingoModal({ onDismiss, onPlayAgain }: BingoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onDismiss]);

  useEffect(() => {
    // Focus the first button when modal opens
    const firstButton = modalRef.current?.querySelector('button');
    firstButton?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out]"
        role="dialog"
        aria-labelledby="bingo-title"
        aria-live="assertive"
      >
        <div className="text-5xl mb-4">🎉</div>
        <h2 id="bingo-title" className="text-3xl font-bold text-amber-500 mb-2">BINGO!</h2>
        <p className="text-gray-600 mb-6">You completed a line!</p>
        
        <div className="space-y-2">
          {onPlayAgain && (
            <button
              onClick={onPlayAgain}
              className="w-full bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-accent-light transition-colors"
            >
              Play Again
            </button>
          )}
          <button
            onClick={onDismiss}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Keep Playing
          </button>
        </div>
      </div>
    </div>
  );
}
