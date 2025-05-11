
import { Character } from "@/types/character";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

interface SpellsSectionProps {
  character: Character;
}

const SpellsSection: React.FC<SpellsSectionProps> = ({ character }) => {
  // This would connect to state management in a real app
  const { spellcasting } = character;
  
  const castSpell = (spellName: string) => {
    toast.success(`Cast ${spellName}!`);
  };
  
  if (!spellcasting || !spellcasting.spellcastingAbility) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-medieval mb-2">No Spellcasting</h3>
        <p className="text-gray-500">This character does not have spellcasting abilities.</p>
      </div>
    );
  }
  
  // Calculate spell save DC and spell attack bonus
  const abilityMod = Math.floor((character.abilityScores[spellcasting.spellcastingAbility as keyof typeof character.abilityScores] - 10) / 2);
  const spellSaveDC = 8 + character.proficiencyBonus + abilityMod;
  const spellAttackBonus = character.proficiencyBonus + abilityMod;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-xl font-medieval">Spellcasting</h3>
        <div className="flex gap-4 mt-2 md:mt-0">
          <div className="text-center">
            <div className="text-sm">Spellcasting Ability</div>
            <div className="font-bold">{spellcasting.spellcastingAbility.toUpperCase()}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">Spell Save DC</div>
            <div className="font-bold">{spellSaveDC}</div>
          </div>
          <div className="text-center">
            <div className="text-sm">Spell Attack</div>
            <div className="font-bold">+{spellAttackBonus}</div>
          </div>
        </div>
      </div>
      
      {/* Spell Slots */}
      <div className="mb-6 border border-dnd-gold bg-white/80 rounded-lg p-4">
        <h4 className="font-medieval text-lg mb-3">Spell Slots</h4>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
          {Array.from({ length: 9 }, (_, i) => {
            const level = i + 1;
            const maxSlots = spellcasting.spellSlots?.[level] || 0;
            const usedSlots = spellcasting.usedSpellSlots?.[level] || 0;
            const availableSlots = maxSlots - usedSlots;
            
            return maxSlots > 0 ? (
              <div key={level} className="p-2 border border-dnd-gold rounded-md bg-white flex flex-col items-center">
                <div className="text-xs font-medium">Level {level}</div>
                <div className="text-lg font-bold">{availableSlots}/{maxSlots}</div>
              </div>
            ) : null;
          })}
        </div>
      </div>
      
      {/* Spell List - Show only if character has spells */}
      {spellcasting.spells && spellcasting.spells.length > 0 ? (
        <div className="space-y-6">
          {/* Group spells by level */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
            const levelSpells = spellcasting.spells?.filter(spell => spell.level === level) || [];
            if (levelSpells.length === 0) return null;
            
            return (
              <div key={level} className="border border-dnd-gold rounded-lg overflow-hidden">
                <div className="bg-dnd-gold/20 px-4 py-2 font-medieval">
                  {level === 0 ? 'Cantrips' : `Level ${level} Spells`}
                </div>
                <div className="divide-y divide-dnd-gold/30 bg-white/80">
                  {levelSpells.map((spell) => (
                    <div key={spell.name} className="flex items-center justify-between p-3 hover:bg-dnd-gold/10">
                      <div>
                        <div className="font-medium">{spell.name}</div>
                        <div className="text-xs text-gray-500">
                          {spell.school} • {spell.castingTime} • {spell.range}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs bg-dnd-gold/20 px-2 py-1 rounded">
                          {spell.components}
                        </span>
                        {level > 0 && (
                          <Button 
                            size="sm" 
                            className="bg-dnd-purple hover:bg-dnd-purple/90" 
                            onClick={() => castSpell(spell.name)}
                          >
                            Cast
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed border-dnd-gold rounded-lg">
          <p className="text-gray-500">No spells prepared or known.</p>
        </div>
      )}
    </div>
  );
};

export default SpellsSection;
