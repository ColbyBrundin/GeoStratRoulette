import type { Strategy, Team, Difficulty } from '@/types';

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

const defaultStrategiesCSV = `Police Brutality,Only buy tasers and flashes.,Both,Hard
Build the Wall,Stack a site of your choice and build a five player wall. Once someone dies or the bomb is planted the wall can be dissolved.,CT,Medium
"Artillery, Mid",Buy HE grenades and chuck all of them at the first player your team sees.,T,Easy
Patience is a Virtue,You are not allowed to enter either site until the final 30 seconds of the round.,T,Easy
Helen Keller,Turn game volume off. All kills must be gotten while flashed.,Both,Hard
Legally Blind,The current top scorer on your team must turn off their monitor (or look away from their screen) for the entire round.,Both,Medium
AFK?,Everyone stays in spawn until the bomb is planted or the enemy team peaks spawn.,CT,Medium
Lone Wanderer,"Send one player out from spawn at a time, while everyone else must remain still. When the player dies, another must take his place.",T,Hard
One Armed Bandit,"Only use one hand to move, aim, etc. The hand must remain the same for the entire round.",Both,Hard
Throw it in Reverse,"You are only allowed to move backwards, not forwards or sideways.",Both,Hard
CQB Masters,"Everyone must use a shotgun. If you can't equip the whole team, you are not allowed to attack enemies until you pick one up.",Both,Easy
Lure Them In,Abandon both sites until the bomb is planted.,CT,Easy
Silent Killer,"You can only walk or crouch walk to move, no running is allowed.",Both,Medium
Green Beret,You can only use weapons that have been picked up from an enemy. Grenades and knives are allowed.,Both,Hard
Superior Lefties,"You must swap hands on the keyboard and mouse (generally, this means left hand on mouse, right hand on keyboard).",Both,Hard
Quiet on Comms,Everyone must make intentionally vague or false callouts throughout the round.,Both,Easy
Simple,Buy as many snipers as you can afford and use all of them (up to 5). Only no-scoping is allowed.,Both,Medium
Save the Eardrums,Buy and use only suppressed weapons.,CT,Medium
Attack the D Point!,"Take one site, then immediately rush to the other site and plant.",T,Medium
I'm Invincible!,"If you take damage, you must go back to your spawn (to heal, of course).",Both,Hard
LMG Rush,"Everyone must use any LMG, and those who cannot afford it must use only a knife and grenades.",Both,Medium
Stop Camping!,"Everyone pick a corner or angle to sit in. Once you get there, you cannot move until the bomb is planted.",CT,Easy
"Use My Weapon, I Beg You!",You must buy a gun for the person below you on the leaderboard (bottom buys for top). They must use only that weapon and grenades for the entire round.,Both,Easy
Frozen,Do not move from your spawn position for the first minute of the round.,CT,Hard
"Red Light, Green Light","For the first 30 seconds of the round, you can move, but for the next 30, you must stand still. This repeats until the game ends.",Both,Hard
Commentary,The player on the bottom of the leaderboard must give CS Major style commentary of every action the team is taking for the whole round.,CT,Easy
Bunny Hop,You must continuously jump until the round ends.,Both,Hard
COD Player,You must jump and prefire every corner.,T,Medium
Airborne,Every kill must be done while jumping.,Both,Medium
Early Rotation,"Everyone rushes one of the sites. Once your team gets a kill, stop all engagements and quickly rotate to the other site.",T,Easy
Mid Rush,Everyone rushes mid. No stopping until you reach the enemy or their spawn.,Both,Easy
XCOM,The person on the bottom of the leaderboard must tell each person in the squad where to go on the map. Nobody can move anywhere else without the Commander's EXPLICIT approval.,Both,Medium
Wall Hugging,Run to the nearest wall. You must remain in contact with a wall (or adjacent object) for the rest of the round.,Both,Hard
Don't Be a Loser,"You are not allowed to defuse with a kit, but the bomb MUST be planted and defused.",CT,Easy
Equality,You are not allowed to have more players alive than the enemy team until you kill the final player.,Both,Medium
Russian Bias,"You are only allowed to use Russian-made weapons (AK-47, PP Bizon, and knife).",T,Easy
Weapons Master,Every kill must be done with a different weapon.,Both,Easy
Grenade Master,Nobody on the team can use weapons until somebody gets a grenade kill.,Both,Medium
Half Life,You cannot attack the enemy until you have less than 50 HP.,Both,Medium
No Wasted Ammo,"Manual reloading is forbidden, you can only reload by emptying the magazine.",Both,Easy
Alcoholics United,"Everyone must buy a molotov. Pick a site to rush, then throw all molotovs onto the site before entering.",T,Easy
Designated Smoking Area,"Everyone must buy a smoke. Pick a site to rush, then throw all smokes onto the site before entering.",T,Easy
Butter Fingers,You must drop any weapon you get a kill with. Can only use it again after you get a kill with another weapon.,Both,Medium
Crab Rave,"You are only allowed to move sideways, not forwards or backwards.",Both,Medium
At Least Be Original,You are not allowed to use or buy any weapons or grenades you used in the previous round.,Both,Medium
Marathon,At least one player on your team must make a full rotation around the map (longest route possible) before you are allowed to plant.,T,Hard
Vomit,"When somebody gets a kill, that player must drop every weapon and grenade and pick them back up before attacking an enemy again.",Both,Medium
Stacking +2s,Every kill must be done while standing on another player.,CT,Hard
Defeatists,Everyone must communicate as if the round is hopeless and criticize every teammate's performance for the entire round.,Both,Easy
Secret Service,"If the top scorer on your team dies, you must throw the round.",Both,Medium
Better Call SAW,Every kill must be done with an M249 or a knife.,Both,Medium
Waste of Money,Any gun with a skin you bought off the Steam market cannot be used this round. Knives and grenades are allowed.,Both,Easy
Pay to Win,Only guns with a skin you bought off the Steam market can be used this round. Knives and grenades are allowed.,Both,Easy
Human Shield,All bullets must be fired from behind a teammate (bullets must pass no more than a meter from their body).,Both,Medium
Hot Potato,The bomb must be passed to another player within 5 seconds of picking it up. This lasts until the bomb is planted.,T,Medium
Assisted Dying,Every kill must come with an assist unless there is only one player left on your team.,Both,Easy
The Radical Left,You are only allowed to turn your view left.,Both,Medium
Formation,All players must move or stop in unison. Anyone caught moving or stopping seperately should probably be executed.,T,Medium
They'll Never See it Coming,"When entering any room or peeking any corner, you must throw your pistol around the corner first as if it were a flashbang.",T,Medium
Decoy Out!,Buy a decoy grenade and throw it at the first enemy you see before shooting them.,T,Easy
Carpet Bombing,"Everyone must buy four grenades of any type. Push one of the sites, then throw every grenade on the site before or during the push.",T,Easy
Wait Your Turn,Only one player is allowed to move at once.,Both,Hard
Greeting Party,"Stack everyone on one site, and have everyone sit just around the corner at a single enterence.",CT,Easy
MVM Rush,"The bomb carrier must equip the bomb and continue running towards the nearest site until they plant. If they die, the next man must take his place.",T,Easy
Everyone Gets a Turn,"Your team must allow the bomb to be planted, then have every remaining team member start a defuse before defusing it.",CT,Medium
Quad Fake,"Four players must rush one site, while the fifth lurks by the opposite site waiting to plant.",T,Easy
Terrorist Supremacy,You may only use guns that are only available to T-side.,T,Easy
Counter-Terrorist Supremacy,You may only use guns that are only available to CT-side.,CT,Easy`;

// Strategies with variables (from Sheet2) - includes weights
const variableStrategiesCSV = `Rush _! Rush _!,Go straight to the _ site. Do not stop moving at all until the bomb is planted.,T,Easy,sites,1
It's High Noon,"Everyone must use a revolver or desert eagle. If you can't equip the whole team, you are not allowed to attack enemies until you pick one up.",Both,Easy,high_noon,1
"One Shot, One Kill","Everyone must use a sniper. If you can't equip the whole team, you are not allowed to attack enemies until you pick one up.",Both,Easy,snipers,1
Abundance of _s,"Everyone must use a _. If there is not enough money to equip everyone with a _, the remaining players must use a knife and grenades.",CT,Medium,ct_weapons,5
Abundance of _s,"Everyone must use a _. If there is not enough money to equip everyone with a _, the remaining players must use a knife and grenades.",T,Medium,t_weapons,5`;

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
  const lines = defaultStrategiesCSV.split('\n').filter((line) => line.trim());
  
  const baseStrategies = lines.map((line, index) => {
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

  // Add variable strategies with weights
  const variableLines = variableStrategiesCSV.split('\n').filter((line) => line.trim());
  const variableStrategies = variableLines.map((line, index) => {
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

