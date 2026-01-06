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
- **Theme configuration:** Define design tokens in `src/index.css` using `@theme` directive with CSS variables (e.g., `--color-accent`, `--font-display`, `--breakpoint-lg`).
- **Native opacity:** Use `/number` syntax for transparency (e.g., `bg-accent/50`, `text-gray-900/75`).
- **Container queries:** Use `@container` for component-responsive styling (e.g., `@container`, `@sm:grid-cols-2`).
- **Arbitrary CSS variables:** Reference custom properties directly (e.g., `w-[--sidebar-width]`, `fill-[--icon-color]`).
- **Advanced utilities:**
  - 3D transforms: `rotate-x-45`, `rotate-y-90`, `perspective-1000`
  - Gradients: `bg-gradient-radial`, `bg-gradient-conic`
  - Variants: `not-*` for inverse states (e.g., `not-hover:opacity-100`)
  - Color spaces: Modern OKLCH colors for vibrant, perceptually uniform palettes
- **Multi-theme support:** Use `@theme inline` with CSS variables at `:root` for runtime theme switching.
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

## Tailwind v4 Best Practices

### @theme Configuration Pattern
```css
@theme {
  /* Semantic color tokens using OKLCH for vibrant colors */
  --color-primary: oklch(0.55 0.21 258);
  --color-surface: oklch(0.98 0.01 264);
  
  /* Typography */
  --font-display: "Space Grotesk", sans-serif;
  
  /* Spacing (generates w-17, p-17, etc.) */
  --spacing: 0.25rem;
  
  /* Custom breakpoints */
  --breakpoint-tablet: 640px;
}
```

### Native Opacity (v4 Feature)
- Use `/number` for transparency: `bg-primary/50`, `text-accent/75`
- Works with all colors, including arbitrary values: `bg-[#3b82f6]/30`

### Container Queries (Built-in v4)
```html
<div class="@container">
  <div class="grid @sm:grid-cols-2 @lg:grid-cols-3">
    <!-- Responsive to container, not viewport -->
  </div>
</div>
```

### Advanced Features
- **3D transforms:** `rotate-x-45 rotate-y-90 perspective-1000` for card flips and depth effects
- **Gradient utilities:** `bg-gradient-radial from-blue-500 to-purple-600` for modern backgrounds
- **Not-variant:** `not-hover:opacity-100` styles when condition is false
- **Arbitrary CSS vars:** `w-[--custom-width] text-[--brand-color]` directly reference CSS variables

### Multi-theme Support
```css
@theme inline {
  --color-primary: var(--primary);
}

:root { --primary: #3b82f6; }
.dark { --primary: #60a5fa; }
```

### Performance Tips
- Use CSS-first configuration (no `tailwind.config.js` needed)
- Leverage automatic content detection
- Modern CSS features (cascade layers, color-mix) are built-in
