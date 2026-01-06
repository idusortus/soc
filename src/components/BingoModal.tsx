interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fade-in_0.2s_ease-out]">
      <div className="bg-white rounded-2xl p-8 max-w-xs w-full text-center shadow-2xl animate-[bounce_0.5s_ease-out] border-2 border-amber-200">
        <div className="text-6xl mb-4 animate-[bounce_1s_ease-in-out_infinite]">🎉</div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent mb-3">
          BINGO!
        </h2>
        <p className="text-gray-600 mb-8 text-lg">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-95 transition-all duration-200"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
