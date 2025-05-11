
export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  experience: number;
  
  abilityScores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  
  proficiencyBonus: number;
  inspiration: boolean;
  armorClass: number;
  initiative: number;
  speed: number;
  hitPoints: {
    max: number;
    current: number;
    temporary: number;
  };
  
  savingThrows: string[]; // "str", "dex", etc.
  skills: string[]; // skill names like "acrobatics", "perception", etc.
  expertise?: string[]; // skill names with expertise
  
  proficiencies?: {
    armor?: string[];
    weapons?: string[];
    tools?: string[];
  };
  
  languages?: string[];
  
  equipment?: {
    armor?: {
      name: string;
      ac: number;
    };
    shield?: {
      name: string;
      bonus: number;
    };
    weapons?: Array<{
      name: string;
      damage: string;
      damageType: string;
      properties?: string[];
    }>;
  };
  
  spellcasting?: {
    spellcastingAbility: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
    spellSlots?: Record<number, number>;  // level -> slots
    usedSpellSlots?: Record<number, number>; // level -> used slots
    spells?: Array<{
      name: string;
      level: number;
      school: string;
      castingTime: string;
      range: string;
      components: string;
      duration: string;
      description: string;
    }>;
  };
  
  inventory: Array<{
    id: string;
    name: string;
    quantity: number;
    weight: number;
    description?: string;
  }>;
  
  currency?: {
    platinum: number;
    gold: number;
    electrum: number;
    silver: number;
    copper: number;
  };
  
  features: Array<{
    name: string;
    description: string;
    source?: string;
  }>;
  
  racialTraits: Array<{
    name: string;
    description: string;
  }>;
  
  feats: Array<{
    name: string;
    description: string;
  }>;
}
