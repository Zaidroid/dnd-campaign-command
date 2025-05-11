import { Character } from "@/types/character";

interface AbilityScoreSectionProps {
  character: Character;
}

const AbilityScoreSection: React.FC<AbilityScoreSectionProps> = ({ character }) => {
  // Calculate ability modifiers
  const getModifier = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };
  
  const { abilityScores } = character;
  
  const abilities = [
    { key: 'str', name: 'Strength', score: abilityScores.str },
    { key: 'dex', name: 'Dexterity', score: abilityScores.dex },
    { key: 'con', name: 'Constitution', score: abilityScores.con },
    { key: 'int', name: 'Intelligence', score: abilityScores.int },
    { key: 'wis', name: 'Wisdom', score: abilityScores.wis },
    { key: 'cha', name: 'Charisma', score: abilityScores.cha },
  ];
  
  return (
    <div>
      <h3 className="text-xl font-medieval mb-4">Ability Scores</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {abilities.map((ability) => (
          <div key={ability.key} className="stat-box">
            <span className="text-sm font-medium">{ability.name}</span>
            <span className="text-xl font-bold">{ability.score}</span>
            <span className="text-md">{getModifier(ability.score)}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="border border-dnd-gold bg-white/80 rounded-lg p-4">
          <h4 className="font-medieval text-lg mb-2">Combat Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 border border-dnd-gold rounded-lg">
              <div className="text-sm">Armor Class</div>
              <div className="text-xl font-bold">{character.armorClass}</div>
            </div>
            <div className="text-center p-2 border border-dnd-gold rounded-lg">
              <div className="text-sm">Initiative</div>
              <div className="text-xl font-bold">+{getModifier(abilityScores.dex)}</div>
            </div>
            <div className="text-center p-2 border border-dnd-gold rounded-lg">
              <div className="text-sm">Speed</div>
              <div className="text-xl font-bold">{character.speed} ft.</div>
            </div>
            <div className="text-center p-2 border border-dnd-gold rounded-lg">
              <div className="text-sm">Hit Points</div>
              <div className="text-xl font-bold">{character.hitPoints.current}/{character.hitPoints.max}</div>
            </div>
          </div>
        </div>
        
        <div className="border border-dnd-gold bg-white/80 rounded-lg p-4">
          <h4 className="font-medieval text-lg mb-2">Saving Throws</h4>
          <div className="grid grid-cols-2 gap-2">
            {abilities.map((ability) => {
              const isProficient = character.savingThrows.includes(ability.key);
              const mod = parseInt(getModifier(ability.score));
              const bonus = isProficient ? mod + character.proficiencyBonus : mod;
              const bonusStr = bonus >= 0 ? `+${bonus}` : `${bonus}`;
              
              return (
                <div key={`save-${ability.key}`} className="flex items-center">
                  <div className={`h-4 w-4 rounded-full border ${isProficient ? 'bg-dnd-purple border-dnd-purple' : 'border-gray-400'} mr-2`}></div>
                  <span className="text-sm">{ability.name.slice(0, 3)}: {bonusStr}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="border border-dnd-gold bg-white/80 rounded-lg p-4">
          <h4 className="font-medieval text-lg mb-2">Proficiency & Inspiration</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-2 border border-dnd-gold rounded-lg">
              <div className="text-sm">Proficiency Bonus</div>
              <div className="text-xl font-bold">+{character.proficiencyBonus}</div>
            </div>
            <div className="text-center p-2 border border-dnd-gold rounded-lg">
              <div className="text-sm">Inspiration</div>
              <div className="text-xl font-bold">{character.inspiration ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityScoreSection;
