
export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment?: string;
  experience?: number;
  abilityScores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  hitPoints: {
    current: number;
    max: number;
    temporary?: number;
  };
  armorClass: number;
  speed: number;
  proficiencyBonus: number;
  savingThrows?: {
    str: boolean;
    dex: boolean;
    con: boolean;
    int: boolean;
    wis: boolean;
    cha: boolean;
  };
  skills?: {
    [key: string]: boolean;
  };
  proficiencies?: string[];
  equipment?: {
    id: string;
    name: string;
    quantity: number;
    description?: string;
    equipped?: boolean;
  }[];
  features?: {
    name: string;
    source: string;
    description: string;
  }[];
  spells?: {
    id: string;
    name: string;
    level: number;
    school: string;
    description: string;
    prepared: boolean;
  }[];
  description?: string;
  personality?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  appearance?: string;
  lastUpdated: string; // ISO date string
}
