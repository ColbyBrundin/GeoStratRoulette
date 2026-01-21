'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Strategy, RouletteSettings, Team, Difficulty } from '@/types';

interface StrategyStore {
  strategies: Strategy[];
  settings: RouletteSettings;
  currentStrategy: Strategy | null;
  isSpinning: boolean;
  
  // Actions
  addStrategy: (strategy: Omit<Strategy, 'id' | 'createdAt'>) => void;
  removeStrategy: (id: string) => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  setSettings: (settings: Partial<RouletteSettings>) => void;
  spinRoulette: () => void;
  clearCurrentStrategy: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample strategies to get started
const defaultStrategies: Strategy[] = [
  {
    id: generateId(),
    name: 'Rush B No Stop',
    description: 'Everyone buys SMGs and rushes B site. No stopping, no peeking, just run.',
    team: 'T',
    difficulty: 'Easy',
    createdAt: Date.now(),
  },
  {
    id: generateId(),
    name: 'Stack A',
    description: 'All 5 CTs stack on A site. Leave B completely open.',
    team: 'CT',
    difficulty: 'Medium',
    createdAt: Date.now(),
  },
  {
    id: generateId(),
    name: 'Knife Only Round',
    description: 'Everyone only uses their knife. No exceptions.',
    team: 'Both',
    difficulty: 'Troll',
    createdAt: Date.now(),
  },
  {
    id: generateId(),
    name: 'Eco Deagle',
    description: 'Full eco but everyone buys a Deagle. One tap or nothing.',
    team: 'Both',
    difficulty: 'Hard',
    createdAt: Date.now(),
  },
];

export const useStrategyStore = create<StrategyStore>()(
  persist(
    (set, get) => ({
      strategies: defaultStrategies,
      settings: {
        includedTeams: ['T', 'CT', 'Both'],
        includedDifficulties: ['Easy', 'Medium', 'Hard', 'Troll'],
      },
      currentStrategy: null,
      isSpinning: false,

      addStrategy: (strategy) => {
        const newStrategy: Strategy = {
          ...strategy,
          id: generateId(),
          createdAt: Date.now(),
        };
        set((state) => ({
          strategies: [...state.strategies, newStrategy],
        }));
      },

      removeStrategy: (id) => {
        set((state) => ({
          strategies: state.strategies.filter((s) => s.id !== id),
        }));
      },

      updateStrategy: (id, updates) => {
        set((state) => ({
          strategies: state.strategies.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
      },

      setSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },

      spinRoulette: () => {
        const { strategies, settings } = get();
        
        // Filter strategies based on settings
        const eligible = strategies.filter((s) => {
          const teamMatch = settings.includedTeams.includes(s.team);
          const difficultyMatch = settings.includedDifficulties.includes(s.difficulty);
          const mapMatch = !settings.selectedMap || !s.map || s.map === settings.selectedMap;
          return teamMatch && difficultyMatch && mapMatch;
        });

        if (eligible.length === 0) {
          set({ currentStrategy: null, isSpinning: false });
          return;
        }

        set({ isSpinning: true });

        // Simulate spinning animation
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * eligible.length);
          set({
            currentStrategy: eligible[randomIndex],
            isSpinning: false,
          });
        }, 2000);
      },

      clearCurrentStrategy: () => {
        set({ currentStrategy: null });
      },
    }),
    {
      name: 'cs2-strategy-storage',
    }
  )
);

