export type Team = 'T' | 'CT';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  team: Team;
  difficulty: Difficulty;
  map?: string;
  createdAt: number;
  isImported?: boolean;
  isDefault?: boolean;
}

export interface RouletteSettings {
  selectedTeam: Team;
  includedDifficulties: Difficulty[];
  selectedMap?: string;
}

