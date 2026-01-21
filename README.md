# CS2 Strategy Roulette

A Counter-Strike 2 strategy roulette game built with Next.js, React, and TypeScript. Spin the wheel to get a random strategy for your next round!

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18-61dafb)

## Features

- 🎰 **Spin the Roulette** - Get a random strategy for your team
- 📝 **Add Custom Strategies** - Create your own strategies with name, description, team, and difficulty
- 🎯 **Filter Options** - Filter by team (T/CT/Both) and difficulty (Easy/Medium/Hard/Troll)
- 💾 **Local Storage** - All strategies are saved in your browser
- 🎨 **Tactical Dark Theme** - CS2-inspired aesthetic with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd GeoStratRoulette
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Spin the Wheel** - Click the "SPIN" button to get a random strategy
2. **Add Strategies** - Click "+ Add Strategy" to create your own
3. **Filter Results** - Use the filter panel to narrow down by team or difficulty
4. **View All** - Click "View All" to see your complete strategy list

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand with persist middleware
- **Styling**: CSS Modules with CSS Variables
- **Font**: Chakra Petch + Share Tech Mono

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── page.module.css  # Page-specific styles
├── components/
│   ├── Header.tsx       # Site header
│   ├── RouletteWheel.tsx # Main roulette wheel
│   ├── StrategyCard.tsx # Strategy display card
│   ├── StrategyList.tsx # List of all strategies
│   ├── FilterPanel.tsx  # Team/difficulty filters
│   └── AddStrategyModal.tsx # Add strategy form
├── store/
│   └── useStrategyStore.ts # Zustand store with persistence
└── types/
    └── index.ts         # TypeScript type definitions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project can be easily deployed to:

- **Vercel** (recommended): Connect your GitHub repo and deploy automatically
- **Netlify**: Build command `npm run build`, publish directory `.next`
- **Any static host**: Export with `next export` (after configuring)

## Customization

### Adding Default Strategies

Edit `src/store/useStrategyStore.ts` and modify the `defaultStrategies` array.

### Changing Theme Colors

Edit the CSS variables in `src/app/globals.css` under the `:root` selector.

## License

MIT
