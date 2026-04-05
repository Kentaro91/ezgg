# EZGG - Gaming Guide Platform

## Project Overview
A personal gaming information website that organizes game-specific tips and guides for easy reference.
Currently supports Diablo 2 Resurrected (D2R), with plans to add more games.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (dark theme)
- **Routing**: React Router v6
- **Language**: Korean (UI text in Korean)

## Project Structure
```
src/
  components/       # Shared UI components
  pages/            # Page-level components
  games/            # Game-specific modules
    d2r/            # Diablo 2 Resurrected
      components/   # D2R-specific components
      data/         # D2R guide data (JSON/TS)
  styles/           # Global styles, theme
  App.tsx
  main.tsx
```

## Conventions
- Component files: PascalCase (e.g., `GuideCard.tsx`)
- Data files: camelCase (e.g., `warlockGuide.ts`)
- Use functional components with hooks
- Keep guide data separate from components (data-driven rendering)
- Each game module is self-contained under `src/games/<game>/`

## Adding a New Game
1. Create a new directory under `src/games/<game-id>/`
2. Add game entry to the main navigation
3. Implement game-specific components and data
