import { Character } from "@/types/character";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeaturesSectionProps {
  character: Character;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ character }) => {
  const { features = [], racialTraits = [], feats = [] } = character;
  
  return (
    <div>
      <h3 className="text-xl font-medieval mb-4">Features & Traits</h3>
      
      <div className="space-y-6">
        {/* Class Features */}
        <div>
          <h4 className="font-medieval text-lg mb-3">Class Features</h4>
          {features && features.length > 0 ? (
            <Accordion type="single" collapsible className="border border-dnd-gold rounded-lg overflow-hidden bg-white/80">
              {features.map((feature, index) => (
                <AccordionItem key={index} value={`feature-${index}`}>
                  <AccordionTrigger className="px-4 py-2 hover:bg-dnd-gold/10">
                    {feature.name}
                    {feature.source && <span className="text-xs text-gray-500 ml-2">({feature.source})</span>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 bg-white/60">
                    <p>{feature.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center p-4 border border-dashed border-dnd-gold rounded-lg">
              <p className="text-gray-500">No class features available.</p>
            </div>
          )}
        </div>
        
        {/* Racial Traits */}
        <div>
          <h4 className="font-medieval text-lg mb-3">Racial Traits</h4>
          {racialTraits && racialTraits.length > 0 ? (
            <Accordion type="single" collapsible className="border border-dnd-gold rounded-lg overflow-hidden bg-white/80">
              {racialTraits.map((trait, index) => (
                <AccordionItem key={index} value={`trait-${index}`}>
                  <AccordionTrigger className="px-4 py-2 hover:bg-dnd-gold/10">
                    {trait.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 bg-white/60">
                    <p>{trait.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center p-4 border border-dashed border-dnd-gold rounded-lg">
              <p className="text-gray-500">No racial traits available.</p>
            </div>
          )}
        </div>
        
        {/* Feats */}
        <div>
          <h4 className="font-medieval text-lg mb-3">Feats</h4>
          {feats && feats.length > 0 ? (
            <Accordion type="single" collapsible className="border border-dnd-gold rounded-lg overflow-hidden bg-white/80">
              {feats.map((feat, index) => (
                <AccordionItem key={index} value={`feat-${index}`}>
                  <AccordionTrigger className="px-4 py-2 hover:bg-dnd-gold/10">
                    {feat.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 bg-white/60">
                    <p>{feat.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center p-4 border border-dashed border-dnd-gold rounded-lg">
              <p className="text-gray-500">No feats taken yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
