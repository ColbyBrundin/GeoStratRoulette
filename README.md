# CS2 Strategy Roulette

A Counter-Strike 2 strategy roulette game built with Next.js, React, and TypeScript. Spin the wheel to get a random strategy for your next round!

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18-61dafb)

## Features

- Get a random strategy for your team
- Filter by team and difficulty
- Create your own strategies with name, description, team, and difficulty

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
