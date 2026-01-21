export type Team = 'T' | 'CT' | 'Both';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Troll';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  team: Team;
  difficulty: Difficulty;
  map?: string;
  createdAt: number;
}

export interface RouletteSettings {
  includedTeams: Team[];
  includedDifficulties: Difficulty[];
  selectedMap?: string;
}

