
import { Character } from "@/types/character";

interface SkillsSectionProps {
  character: Character;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ character }) => {
  // Calculate ability modifiers
  const getModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };
  
  const skillsList = [
    { name: 'Acrobatics', ability: 'dex' },
    { name: 'Animal Handling', ability: 'wis' },
    { name: 'Arcana', ability: 'int' },
    { name: 'Athletics', ability: 'str' },
    { name: 'Deception', ability: 'cha' },
    { name: 'History', ability: 'int' },
    { name: 'Insight', ability: 'wis' },
    { name: 'Intimidation', ability: 'cha' },
    { name: 'Investigation', ability: 'int' },
    { name: 'Medicine', ability: 'wis' },
    { name: 'Nature', ability: 'int' },
    { name: 'Perception', ability: 'wis' },
    { name: 'Performance', ability: 'cha' },
    { name: 'Persuasion', ability: 'cha' },
    { name: 'Religion', ability: 'int' },
    { name: 'Sleight of Hand', ability: 'dex' },
    { name: 'Stealth', ability: 'dex' },
    { name: 'Survival', ability: 'wis' },
  ];
  
  const { abilityScores, skills, proficiencyBonus } = character;
  
  return (
    <div>
      <h3 className="text-xl font-medieval mb-4">Skills</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillsList.map((skill) => {
          const isProficient = skills.includes(skill.name.toLowerCase());
          const expertised = character.expertise?.includes(skill.name.toLowerCase()) || false;
          const abilityMod = getModifier(abilityScores[skill.ability as keyof typeof abilityScores]);
          
          let bonus = abilityMod;
          if (isProficient) bonus += proficiencyBonus;
          if (expertised) bonus += proficiencyBonus;
          
          const bonusStr = bonus >= 0 ? `+${bonus}` : `${bonus}`;
          
          return (
            <div key={skill.name} className="flex items-center p-2 bg-white/80 border border-dnd-gold rounded">
              <div className="mr-2">
                {expertised ? (
                  <div className="h-4 w-4 rounded-full bg-dnd-gold border border-dnd-gold"></div>
                ) : isProficient ? (
                  <div className="h-4 w-4 rounded-full bg-dnd-purple border border-dnd-purple"></div>
                ) : (
                  <div className="h-4 w-4 rounded-full border border-gray-400"></div>
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm">{skill.name}</span>
                <span className="text-xs text-gray-500 ml-1">({skill.ability.toUpperCase()})</span>
              </div>
              <div className="text-right font-medium">{bonusStr}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-medieval mb-4">Languages & Proficiencies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-dnd-gold bg-white/80 rounded-lg p-4">
            <h4 className="font-medieval text-lg mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {character.languages?.map((language) => (
                <div key={language} className="px-3 py-1 bg-white border border-dnd-purple rounded-full text-sm">
                  {language}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-dnd-gold bg-white/80 rounded-lg p-4">
            <h4 className="font-medieval text-lg mb-2">Other Proficiencies</h4>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h5 className="text-sm font-medium">Armor:</h5>
                <p className="text-sm">{character.proficiencies?.armor?.join(', ') || 'None'}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium">Weapons:</h5>
                <p className="text-sm">{character.proficiencies?.weapons?.join(', ') || 'None'}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium">Tools:</h5>
                <p className="text-sm">{character.proficiencies?.tools?.join(', ') || 'None'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
