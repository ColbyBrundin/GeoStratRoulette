export type Team = 'T' | 'CT' | 'Both';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  team: Team;
  difficulty: Difficulty;
  createdAt: number;
  isImported?: boolean;
  isDefault?: boolean;
  variable?: string;
  weight?: number;
}

export interface StratSelectSettings {
  selectedTeam: Team;
  includedDifficulties: Difficulty[];
}

