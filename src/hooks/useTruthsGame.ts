import { useState, useCallback, useMemo } from 'react';
import type { Profile, TruthsGameState, GuessResult } from '../types/truths';
import { profiles as allProfiles } from '../data/profiles';

const STORAGE_KEY = 'truths-game-state';
const STORAGE_VERSION = 1;

interface StoredGameData {
  version: number;
  gameState: TruthsGameState;
  currentProfileIndex: number;
  results: GuessResult[];
  shuffledProfiles: Profile[];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadGameState(): Partial<StoredGameData> | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (parsed.version === STORAGE_VERSION) {
      return parsed;
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

function saveGameState(data: StoredGameData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silent fail
  }
}

export function useTruthsGame() {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<TruthsGameState>(
    () => loadedState?.gameState || 'start'
  );

  const [shuffledProfiles] = useState<Profile[]>(
    () => loadedState?.shuffledProfiles || shuffleArray(allProfiles)
  );

  const [currentProfileIndex, setCurrentProfileIndex] = useState<number>(
    () => loadedState?.currentProfileIndex || 0
  );

  const [results, setResults] = useState<GuessResult[]>(
    () => loadedState?.results || []
  );

  const [showResult, setShowResult] = useState(false);

  const currentProfile = shuffledProfiles[currentProfileIndex];
  const isLastProfile = currentProfileIndex >= shuffledProfiles.length - 1;

  const score = useMemo(
    () => results.filter((r) => r.wasCorrect).length,
    [results]
  );

  // Save to localStorage whenever state changes
  const persistState = useCallback(() => {
    saveGameState({
      version: STORAGE_VERSION,
      gameState,
      currentProfileIndex,
      results,
      shuffledProfiles,
    });
  }, [gameState, currentProfileIndex, results, shuffledProfiles]);

  const startGame = useCallback(() => {
    const newShuffled = shuffleArray(allProfiles);
    setGameState('playing');
    setCurrentProfileIndex(0);
    setResults([]);
    setShowResult(false);
    
    saveGameState({
      version: STORAGE_VERSION,
      gameState: 'playing',
      currentProfileIndex: 0,
      results: [],
      shuffledProfiles: newShuffled,
    });
  }, []);

  const makeGuess = useCallback(
    (statementIndex: number) => {
      if (!currentProfile || showResult) return;

      const correctLieIndex = currentProfile.statements.findIndex(
        (s) => s.isLie
      );
      const wasCorrect = statementIndex === correctLieIndex;

      const result: GuessResult = {
        profileId: currentProfile.id,
        guessedStatementIndex: statementIndex,
        wasCorrect,
        correctLieIndex,
      };

      setResults((prev) => [...prev, result]);
      setShowResult(true);

      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(wasCorrect ? [50, 50, 50] : 100);
      }
    },
    [currentProfile, showResult]
  );

  const nextProfile = useCallback(() => {
    setShowResult(false);
    
    if (isLastProfile) {
      setGameState('results');
      persistState();
    } else {
      setCurrentProfileIndex((prev) => prev + 1);
      persistState();
    }
  }, [isLastProfile, persistState]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setCurrentProfileIndex(0);
    setResults([]);
    setShowResult(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    gameState,
    currentProfile,
    currentProfileIndex,
    totalProfiles: shuffledProfiles.length,
    results,
    score,
    showResult,
    isLastProfile,
    startGame,
    makeGuess,
    nextProfile,
    resetGame,
  };
}
