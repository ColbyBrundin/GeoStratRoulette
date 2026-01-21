'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Strategy, RouletteSettings, Difficulty } from '@/types';

interface StrategyStore {
  strategies: Strategy[];
  settings: RouletteSettings;
  currentStrategy: Strategy | null;
  
  // Actions
  addStrategy: (strategy: Omit<Strategy, 'id' | 'createdAt'>) => void;
  addStrategies: (strategies: Omit<Strategy, 'id' | 'createdAt'>[]) => void;
  removeStrategy: (id: string) => void;
  removeImportedStrategies: () => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  setSettings: (settings: Partial<RouletteSettings>) => void;
  selectStrat: () => void;
  clearCurrentStrategy: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

// Default strategies with fixed IDs so they persist correctly
const DEFAULT_STRATEGY_IDS = {
  rushB: 'default-rush-b',
  stackA: 'default-stack-a',
  knifeOnly: 'default-knife-only',
  ecoDeagle: 'default-eco-deagle',
};

// Sample strategies to get started
const defaultStrategies: Strategy[] = [
  {
    id: DEFAULT_STRATEGY_IDS.rushB,
    name: 'Rush B No Stop',
    description: 'Everyone buys SMGs and rushes B site. No stopping, no peeking, just run.',
    team: 'T',
    difficulty: 'Easy',
    createdAt: 0,
    isDefault: true,
  },
  {
    id: DEFAULT_STRATEGY_IDS.stackA,
    name: 'Stack A',
    description: 'All 5 CTs stack on A site. Leave B completely open.',
    team: 'CT',
    difficulty: 'Medium',
    createdAt: 0,
    isDefault: true,
  },
  {
    id: DEFAULT_STRATEGY_IDS.knifeOnly,
    name: 'Knife Only Round',
    description: 'Everyone only uses their knife. No exceptions.',
    team: 'T',
    difficulty: 'Hard',
    createdAt: 0,
    isDefault: true,
  },
  {
    id: DEFAULT_STRATEGY_IDS.ecoDeagle,
    name: 'Eco Deagle',
    description: 'Full eco but everyone buys a Deagle. One tap or nothing.',
    team: 'CT',
    difficulty: 'Hard',
    createdAt: 0,
    isDefault: true,
  },
];

export const useStrategyStore = create<StrategyStore>()(
  persist(
    (set, get) => ({
      strategies: defaultStrategies,
      settings: {
        selectedTeam: 'T',
        includedDifficulties: ['Easy', 'Medium', 'Hard'],
      },
      currentStrategy: null,

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

      addStrategies: (strategies) => {
        const newStrategies: Strategy[] = strategies.map((s) => ({
          ...s,
          id: generateId(),
          createdAt: Date.now(),
          isImported: true,
        }));
        set((state) => ({
          strategies: [...state.strategies, ...newStrategies],
        }));
      },

      removeStrategy: (id) => {
        set((state) => ({
          strategies: state.strategies.filter((s) => s.id !== id),
        }));
      },

      removeImportedStrategies: () => {
        set((state) => ({
          strategies: state.strategies.filter((s) => !s.isImported),
          currentStrategy: state.currentStrategy?.isImported ? null : state.currentStrategy,
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
          const teamMatch = s.team === settings.selectedTeam;
          const difficultyMatch = settings.includedDifficulties.includes(s.difficulty);
          const mapMatch = !settings.selectedMap || !s.map || s.map === settings.selectedMap;
          return teamMatch && difficultyMatch && mapMatch;
        });

        if (eligible.length === 0) {
          set({ currentStrategy: null });
          return;
        }

        const randomIndex = Math.floor(Math.random() * eligible.length);
        set({ currentStrategy: eligible[randomIndex] });
      },

      clearCurrentStrategy: () => {
        set({ currentStrategy: null });
      },
    }),
    {
      name: 'cs2-strategy-storage',
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<StrategyStore>;
        // Always include default strategies, plus any imported ones from storage
        const importedStrategies = persisted.strategies?.filter((s) => s.isImported) || [];
        return {
          ...currentState,
          ...persisted,
          strategies: [...defaultStrategies, ...importedStrategies],
        };
      },
    }
  )
);

