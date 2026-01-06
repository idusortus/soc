/** Types for Two Truths & A Lie game */

export interface Statement {
  text: string;
  isLie: boolean;
}

export interface Profile {
  id: number;
  name: string;
  statements: [Statement, Statement, Statement]; // Always exactly 3
}

export type TruthsGameState = 'start' | 'playing' | 'results';

export interface GuessResult {
  profileId: number;
  guessedStatementIndex: number;
  wasCorrect: boolean;
  correctLieIndex: number;
}
