import { useState, useRef, useEffect } from 'react';

interface NameInputModalProps {
  questionText: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export function NameInputModal({ questionText, onSubmit, onCancel }: NameInputModalProps) {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name.trim());
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Who matches this?</h3>
        <p className="text-sm text-gray-600 mb-4 italic">"{questionText}"</p>
        
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleEscape}
            placeholder="Enter their name (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onSubmit('')}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              className="flex-1 bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-light transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
