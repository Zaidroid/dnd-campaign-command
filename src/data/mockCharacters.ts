
import { Character } from "@/types/character";

export const mockCharacters: Character[] = [
  {
    id: "1",
    name: "Thorne Ironfist",
    race: "Dwarf",
    class: "Fighter",
    level: 5,
    background: "Soldier",
    alignment: "Lawful Good",
    experience: 6500,
    
    abilityScores: {
      str: 16,
      dex: 12,
      con: 16,
      int: 10,
      wis: 14,
      cha: 8,
    },
    
    proficiencyBonus: 3,
    inspiration: false,
    armorClass: 18,
    initiative: 1,
    speed: 25,
    
    hitPoints: {
      max: 47,
      current: 47,
      temporary: 0,
    },
    
    savingThrows: ["str", "con"],
    skills: ["athletics", "perception", "survival", "intimidation"],
    
    proficiencies: {
      armor: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields"],
      weapons: ["Simple Weapons", "Martial Weapons"],
      tools: ["Smith's Tools", "Brewer's Supplies"],
    },
    
    languages: ["Common", "Dwarvish"],
    
    equipment: {
      armor: {
        name: "Chain Mail",
        ac: 16,
      },
      shield: {
        name: "Steel Shield",
        bonus: 2,
      },
      weapons: [
        {
          name: "Warhammer",
          damage: "1d8",
          damageType: "bludgeoning",
          properties: ["Versatile (1d10)"],
        },
        {
          name: "Handaxe",
          damage: "1d6",
          damageType: "slashing",
          properties: ["Light", "Thrown (range 20/60)"],
        },
      ],
    },
    
    inventory: [
      {
        id: "inv1",
        name: "Potion of Healing",
        quantity: 3,
        weight: 0.5,
        description: "Heals 2d4+2 hit points when drunk.",
      },
      {
        id: "inv2",
        name: "Adventurer's Pack",
        quantity: 1,
        weight: 10,
      },
      {
        id: "inv3",
        name: "Torch",
        quantity: 10,
        weight: 1,
      },
    ],
    
    currency: {
      platinum: 0,
      gold: 45,
      electrum: 0,
      silver: 30,
      copper: 50,
    },
    
    features: [
      {
        name: "Second Wind",
        description: "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.",
        source: "Fighter 1",
      },
      {
        name: "Action Surge",
        description: "Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action. Once you use this feature, you must finish a short or long rest before you can use it again.",
        source: "Fighter 2",
      },
      {
        name: "Improved Critical",
        description: "Beginning when you choose this archetype at 3rd level, your weapon attacks score a critical hit on a roll of 19 or 20.",
        source: "Champion 3",
      },
    ],
    
    racialTraits: [
      {
        name: "Darkvision",
        description: "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      },
      {
        name: "Dwarven Resilience",
        description: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
      },
      {
        name: "Stonecunning",
        description: "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
      },
    ],
    
    feats: [
      {
        name: "Great Weapon Master",
        description: "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain a +10 damage bonus if you take a -5 penalty to attack rolls with heavy weapons. Additionally, when you score a critical hit or reduce a creature to 0 HP, you can make one additional melee attack as a bonus action.",
      },
    ],
    
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Lyra Moonshadow",
    race: "Elf",
    class: "Wizard",
    level: 4,
    background: "Sage",
    alignment: "Neutral Good",
    experience: 3400,
    
    abilityScores: {
      str: 8,
      dex: 16,
      con: 12,
      int: 18,
      wis: 14,
      cha: 10,
    },
    
    proficiencyBonus: 2,
    inspiration: true,
    armorClass: 13,
    initiative: 3,
    speed: 30,
    
    hitPoints: {
      max: 26,
      current: 22,
      temporary: 0,
    },
    
    savingThrows: ["int", "wis"],
    skills: ["arcana", "history", "investigation", "perception"],
    
    proficiencies: {
      weapons: ["Dagger", "Dart", "Sling", "Quarterstaff", "Light Crossbow"],
      tools: ["Alchemist's Supplies"],
    },
    
    languages: ["Common", "Elvish", "Draconic", "Sylvan"],
    
    equipment: {
      weapons: [
        {
          name: "Quarterstaff",
          damage: "1d6",
          damageType: "bludgeoning",
          properties: ["Versatile (1d8)"],
        },
        {
          name: "Dagger",
          damage: "1d4",
          damageType: "piercing",
          properties: ["Finesse", "Light", "Thrown (range 20/60)"],
        },
      ],
    },
    
    spellcasting: {
      spellcastingAbility: "int",
      spellSaveDC: 14,
      spellAttackBonus: 6,
      spellSlots: {
        1: 4,
        2: 3,
      },
      usedSpellSlots: {
        1: 2,
        2: 0,
      },
      spells: [
        {
          name: "Fire Bolt",
          level: 0,
          school: "Evocation",
          castingTime: "1 action",
          range: "120 feet",
          components: "V, S",
          duration: "Instantaneous",
          description: "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage.",
        },
        {
          name: "Mage Hand",
          level: 0,
          school: "Conjuration",
          castingTime: "1 action",
          range: "30 feet",
          components: "V, S",
          duration: "1 minute",
          description: "A spectral, floating hand appears at a point you choose within range.",
        },
        {
          name: "Magic Missile",
          level: 1,
          school: "Evocation",
          castingTime: "1 action",
          range: "120 feet",
          components: "V, S",
          duration: "Instantaneous",
          description: "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range.",
        },
        {
          name: "Shield",
          level: 1,
          school: "Abjuration",
          castingTime: "1 reaction",
          range: "Self",
          components: "V, S",
          duration: "1 round",
          description: "An invisible barrier of magical force appears and protects you.",
        },
        {
          name: "Misty Step",
          level: 2,
          school: "Conjuration",
          castingTime: "1 bonus action",
          range: "Self",
          components: "V",
          duration: "Instantaneous",
          description: "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
        },
        {
          name: "Scorching Ray",
          level: 2,
          school: "Evocation",
          castingTime: "1 action",
          range: "120 feet",
          components: "V, S",
          duration: "Instantaneous",
          description: "You create three rays of fire and hurl them at targets within range.",
        },
      ],
    },
    
    inventory: [
      {
        id: "inv1",
        name: "Spellbook",
        quantity: 1,
        weight: 3,
      },
      {
        id: "inv2",
        name: "Component Pouch",
        quantity: 1,
        weight: 2,
      },
      {
        id: "inv3",
        name: "Scholar's Pack",
        quantity: 1,
        weight: 10,
      },
      {
        id: "inv4",
        name: "Arcane Focus (Crystal)",
        quantity: 1,
        weight: 1,
      },
    ],
    
    currency: {
      platinum: 0,
      gold: 30,
      electrum: 0,
      silver: 15,
      copper: 0,
    },
    
    features: [
      {
        name: "Arcane Recovery",
        description: "You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up).",
        source: "Wizard 1",
      },
      {
        name: "Arcane Tradition: School of Evocation",
        description: "You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid.",
        source: "Wizard 2",
      },
      {
        name: "Sculpt Spells",
        description: "Beginning at 2nd level, you can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 + the spell's level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save.",
        source: "School of Evocation 2",
      },
    ],
    
    racialTraits: [
      {
        name: "Darkvision",
        description: "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
      },
      {
        name: "Fey Ancestry",
        description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
      },
      {
        name: "Trance",
        description: "Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.",
      },
    ],
    
    feats: [
      {
        name: "Alert",
        description: "You are always on the lookout for danger. You gain +5 to initiative, you can't be surprised while you are conscious, and other creatures don't gain advantage on attack rolls against you as a result of being hidden from you.",
      },
    ],
    
    lastUpdated: new Date().toISOString(),
  },
];
