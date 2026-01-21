'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Strategy, StratSelectSettings, Difficulty } from '@/types';
import { getDefaultStrategies, sites, high_noon, snipers, ct_weapons, t_weapons, weapons } from './defaultStrategies';

// Helper to get variable array by name
const getVariableArray = (variableName: string): string[] => {
  const variableMap: Record<string, string[]> = {
    sites,
    high_noon,
    snipers,
    ct_weapons,
    t_weapons,
    weapons,
  };
  return variableMap[variableName] || [];
};

interface StrategyStore {
  strategies: Strategy[];
  settings: StratSelectSettings;
  currentStrategy: Strategy | null;
  dualStrategies: { t: Strategy | null; ct: Strategy | null } | null;
  
  // Actions
  addStrategy: (strategy: Omit<Strategy, 'id' | 'createdAt'>) => void;
  addStrategies: (strategies: Omit<Strategy, 'id' | 'createdAt'>[]) => void;
  removeStrategy: (id: string) => void;
  removeImportedStrategies: () => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  setSettings: (settings: Partial<StratSelectSettings>) => void;
  selectStrat: () => void;
  selectDualStrats: () => void;
  clearCurrentStrategy: () => void;
  clearDualStrategies: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

// Load default strategies from CSV
const defaultStrategies: Strategy[] = getDefaultStrategies();

export const useStrategyStore = create<StrategyStore>()(
  persist(
    (set, get) => ({
      strategies: defaultStrategies,
      settings: {
        selectedTeam: 'T',
        includedDifficulties: ['Easy', 'Medium', 'Hard'],
      },
      currentStrategy: null,
      dualStrategies: null,

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

      selectStrat: () => {
        const { strategies, settings } = get();
        
        // Filter strategies based on settings
        const eligible = strategies.filter((s) => {
          const teamMatch = s.team === settings.selectedTeam || s.team === 'Both';
          const difficultyMatch = settings.includedDifficulties.includes(s.difficulty);
          return teamMatch && difficultyMatch;
        });

        if (eligible.length === 0) {
          set({ currentStrategy: null });
          return;
        }

        // Weighted random selection
        const totalWeight = eligible.reduce((sum, s) => sum + (s.weight || 1), 0);
        let random = Math.random() * totalWeight;
        
        let selectedStrategy = eligible[0];
        for (const strategy of eligible) {
          random -= (strategy.weight || 1);
          if (random <= 0) {
            selectedStrategy = strategy;
            break;
          }
        }

        // Handle variable replacement
        let finalStrategy = { ...selectedStrategy };
        if (selectedStrategy.variable) {
          const variableArray = getVariableArray(selectedStrategy.variable);
          if (variableArray.length > 0) {
            const randomTerm = variableArray[Math.floor(Math.random() * variableArray.length)];
            finalStrategy = {
              ...selectedStrategy,
              name: selectedStrategy.name.replace(/_/g, randomTerm),
              description: selectedStrategy.description.replace(/_/g, randomTerm),
            };
          }
        }

        set({ currentStrategy: finalStrategy });
      },

      clearCurrentStrategy: () => {
        set({ currentStrategy: null });
      },

      selectDualStrats: () => {
        const { strategies, settings } = get();
        
        const selectForTeam = (team: 'T' | 'CT'): Strategy | null => {
          // Filter strategies based on team and difficulty only
          const eligible = strategies.filter((s) => {
            const teamMatch = s.team === team || s.team === 'Both';
            const difficultyMatch = settings.includedDifficulties.includes(s.difficulty);
            return teamMatch && difficultyMatch;
          });

          if (eligible.length === 0) return null;

          // Weighted random selection
          const totalWeight = eligible.reduce((sum, s) => sum + (s.weight || 1), 0);
          let random = Math.random() * totalWeight;
          
          let selectedStrategy = eligible[0];
          for (const strategy of eligible) {
            random -= (strategy.weight || 1);
            if (random <= 0) {
              selectedStrategy = strategy;
              break;
            }
          }

          // Handle variable replacement
          let finalStrategy = { ...selectedStrategy };
          if (selectedStrategy.variable) {
            const variableArray = getVariableArray(selectedStrategy.variable);
            if (variableArray.length > 0) {
              const randomTerm = variableArray[Math.floor(Math.random() * variableArray.length)];
              finalStrategy = {
                ...selectedStrategy,
                name: selectedStrategy.name.replace(/_/g, randomTerm),
                description: selectedStrategy.description.replace(/_/g, randomTerm),
              };
            }
          }

          return finalStrategy;
        };

        set({ 
          dualStrategies: {
            t: selectForTeam('T'),
            ct: selectForTeam('CT'),
          },
          currentStrategy: null,
        });
      },

      clearDualStrategies: () => {
        set({ dualStrategies: null });
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

