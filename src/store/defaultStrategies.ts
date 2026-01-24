import type { Strategy, Team, Difficulty } from '@/types';
import strategiesCSV from '@/data/strategies.csv';
import variableStrategiesCSV from '@/data/variable-strategies.csv';

// Variable arrays for strategies with underscores
export const sites: string[] = ["A", "B"];
export const high_noon: string[] = ["R8 Revolver", "Desert Eagle"];
export const snipers: string[] = ["AWP", "SSG 08"];
export const ct_weapons: string[] = [
  "M4A4",
  "M4A1-S",
  "FAMAS",
  "AUG",
  "SCAR-20",
  "AWP",
  "SSG 08",
  "MP9",
  "MP5-SD",
  "UMP-45",
  "P90",
  "PP-Bizon",
  "Nova",
  "XM1014",
  "MAG-7",
  "M249",
  "Negev",
  "Five-SeveN",
  "USP-S",
  "P2000",
  "P250",
  "CZ75-Auto",
  "Desert Eagle",
  "R8 Revolver",
  "Dual Berettas"
];

export const t_weapons: string[] = [
  "AK-47",
  "Galil AR",
  "SG 553",
  "G3SG1",
  "AWP",
  "SSG 08",
  "MP7",
  "MP5-SD",
  "UMP-45",
  "P90",
  "PP-Bizon",
  "MAC-10",
  "Nova",
  "XM1014",
  "Sawed-Off",
  "M249",
  "Negev",
  "Tec-9",
  "Glock-18",
  "P250",
  "CZ75-Auto",
  "Desert Eagle",
  "R8 Revolver",
  "Dual Berettas"
];

export const weapons: string[] = [
  "AK-47",
  "M4A4",
  "M4A1-S",
  "Galil AR",
  "FAMAS",
  "AUG",
  "SG 553",
  "AWP",
  "SSG 08",
  "SCAR-20",
  "G3SG1",
  "MP9",
  "MP7",
  "MP5-SD",
  "UMP-45",
  "P90",
  "PP-Bizon",
  "MAC-10",
  "Nova",
  "XM1014",
  "MAG-7",
  "Sawed-Off",
  "M249",
  "Negev",
  "Glock-18",
  "USP-S",
  "P2000",
  "P250",
  "Five-SeveN",
  "Tec-9",
  "CZ75-Auto",
  "Desert Eagle",
  "R8 Revolver",
  "Dual Berettas"
];

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

export const getDefaultStrategies = (): Strategy[] => {
  // Parse base strategies from CSV file (skip header row)
  const lines = strategiesCSV.split('\n').filter((line) => line.trim());
  const dataLines = lines.slice(1); // Skip header
  
  const baseStrategies = dataLines.map((line, index) => {
    const [name, description, teamRaw, difficultyRaw] = parseCSVLine(line);
    
    return {
      id: `default-${index}`,
      name: name || 'Unknown Strategy',
      description: description || '',
      team: (teamRaw as Team) || 'Both',
      difficulty: (difficultyRaw as Difficulty) || 'Medium',
      createdAt: 0,
      isDefault: true,
      weight: 1, // Default weight for non-variable strategies
    };
  });

  // Parse variable strategies from CSV file (skip header row)
  const variableLines = variableStrategiesCSV.split('\n').filter((line) => line.trim());
  const variableDataLines = variableLines.slice(1); // Skip header
  const variableStrategies = variableDataLines.map((line, index) => {
    const [name, description, teamRaw, difficultyRaw, variable, weightRaw] = parseCSVLine(line);
    
    return {
      id: `default-var-${index}`,
      name: name || 'Unknown Strategy',
      description: description || '',
      team: (teamRaw as Team) || 'Both',
      difficulty: (difficultyRaw as Difficulty) || 'Medium',
      createdAt: 0,
      isDefault: true,
      variable: variable || undefined,
      weight: weightRaw ? parseInt(weightRaw, 10) : 1,
    };
  });

  return [...baseStrategies, ...variableStrategies];
};

