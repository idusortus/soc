# Copilot Instructions for Soc Ops

## Architecture Overview

**Single-page React app** (Vite + React 19 + TypeScript) with a simple state machine:
- `start` → user sees `StartScreen` → clicks "Start"
- `playing` → `GameScreen` renders a 5×5 `BingoBoard`, user toggles squares
- `bingo` → app detects winning line, shows `BingoModal`, board highlights winning squares

**Data flow:** `useBingoGame` hook manages game state, delegates pure logic to `src/utils/bingoLogic.ts`, and persists state to localStorage. All components are functional with TypeScript props.

## Key Files & Patterns

### State Management (`src/hooks/useBingoGame.ts`)
- **localStorage persistence:** Uses versioned schema (`STORAGE_VERSION`) with validation. Always validate on load and clear invalid data.
- **Async bingo detection:** Uses `queueMicrotask()` to schedule state updates after board toggle to avoid synchronous setState.
- **Immutable updates:** All board operations return new arrays (see `toggleSquare`).

### Game Logic (`src/utils/bingoLogic.ts`)
- **Pure functions:** `generateBoard()`, `toggleSquare()`, `checkBingo()`, `getWinningSquareIds()` — fully tested in `bingoLogic.test.ts`.
- **Board structure:** 25 squares (0-24), center index 12 is always the free space (pre-marked).
- **Winning lines:** 5 rows + 5 columns + 2 diagonals. Function `getWinningLines()` generates all 12 possible lines.

### Component Structure
- **Prop-driven UI:** Components receive `board`, `winningSquareIds`, callbacks. No direct state mutation.
- **Accessibility:** Buttons use `aria-pressed`, `aria-label`. Free space is `disabled`.
- **Grid layout:** Tailwind `grid grid-cols-5` for the 5×5 board.

### Styling (Tailwind v4)
- **Theme variables** in `src/index.css`: `--color-accent`, `--color-marked`, `--color-marked-border`, `--color-bingo`.
- **Dynamic classes:** `bg-marked`, `bg-amber-200` for winning squares. Use `text-xs` for compact mobile text.
- **Mobile-first:** `min-h-[60px]` squares, `max-w-md` board, tap highlight disabled.

## Development Workflow

**Local dev:**
```bash
npm run dev      # Vite dev server on http://localhost:5173/
npm run build    # TypeScript + Vite production build
npm run lint     # ESLint (config: eslint.config.js)
npm run test     # Vitest with jsdom (tests in *.test.ts files)
```

**GitHub Pages deployment:**
- CI workflow at `.github/workflows/deploy.yml` builds on push to `main`.
- **Important:** `vite.config.ts` sets `base: '/soc/'` for subpath routing. CI overrides with `VITE_REPO_NAME` env var.
- Build artifacts in `dist/` are deployed via GitHub Actions Pages deployment.

## Conventions & Guidelines

- **TypeScript strict:** All types in `src/types/index.ts`. Use explicit interfaces for props.
- **No class components:** Functional components only. Use hooks for state.
- **Data editing:** Questions are in `src/data/questions.ts` — edit this array to customize game prompts.
- **Testing:** Pure functions have comprehensive tests. Use `vitest` with `@testing-library/react` for components.
- **Immutability:** Always return new arrays/objects. Never mutate `board` directly.

## Common Tasks

**Add new questions:** Edit `src/data/questions.ts` and add strings to the `questions` array (needs ≥24 for full board).

**Change board size:** Update `BOARD_SIZE` and `CENTER_INDEX` in `bingoLogic.ts`, adjust grid classes in `BingoBoard.tsx`.

**Modify win conditions:** Edit `getWinningLines()` in `bingoLogic.ts` (e.g., add corner win patterns).

**Styling:** Extend `@theme` in `src/index.css` for custom colors, or use Tailwind utilities directly in components.
