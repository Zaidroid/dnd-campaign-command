export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment?: string;
  experience?: number;
  initiative?: number; // Add initiative property
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
  savingThrows: string[]; // Changed from object to string array
  skills: string[]; // Changed from object to string array
  proficiencies: {
    armor?: string[];
    weapons?: string[];
    tools?: string[];
  };
  equipment?: {
    armor?: {
      name: string;
      ac: number;
    };
    shield?: {
      name: string;
      bonus: number;
    };
    weapons?: {
      name: string;
      damage: string;
      damageType: string;
      properties: string[];
    }[];
  };
  inventory?: {
    id: string;
    name: string;
    quantity: number;
    weight: number;
    description?: string;
  }[];
  features?: {
    name: string;
    description: string;
    source: string;
  }[];
  racialTraits?: {
    name: string;
    description: string;
  }[];
  feats?: {
    name: string;
    description: string;
  }[];
  spellcasting?: {
    spellcastingAbility: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    spellSlots?: {
      [key: number]: number;
    };
    usedSpellSlots?: {
      [key: number]: number;
    };
    spells?: {
      name: string;
      level: number;
      school: string;
      castingTime: string;
      range: string;
      components: string;
      duration: string;
      description: string;
      prepared?: boolean;
    }[];
  };
  languages?: string[];
  currency?: {
    platinum: number;
    gold: number;
    electrum: number;
    silver: number;
    copper: number;
  };
  inspiration?: boolean;
  expertise?: string[];
  description?: string;
  personality?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  appearance?: string;
  lastUpdated: string; // ISO date string
}
