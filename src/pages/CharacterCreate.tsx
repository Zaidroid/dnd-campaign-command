import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CharacterCreate = () => {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    class: "",
    background: "",
    level: "1",
    alignment: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = () => {
    // In a real app, this would save to backend
    toast.success("Character created successfully!");
    navigate("/dashboard");
  };
  
  const races = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"];
  
  const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer"];
  
  const backgrounds = ["Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero", "Guild Artisan", "Hermit", "Noble", "Outlander", "Sage", "Sailor", "Soldier", "Urchin"];
  
  const alignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-medieval text-dnd-purple mb-6">Create a New Character</h1>
        
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-1 items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-dnd-purple text-white' : 'bg-gray-200'}`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 flex-1 ${currentStep > step ? 'bg-dnd-purple' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span>Basic Info</span>
            <span>Abilities</span>
            <span>Proficiencies</span>
            <span>Equipment</span>
          </div>
        </div>
        
        <Card className="border-dnd-gold">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="font-medieval">Character Basics</CardTitle>
                <CardDescription>Enter the basic details about your character</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Character Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter character name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="race">Race</Label>
                    <Select value={formData.race} onValueChange={(value) => handleSelectChange("race", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select race" />
                      </SelectTrigger>
                      <SelectContent>
                        {races.map((race) => (
                          <SelectItem key={race} value={race}>
                            {race}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={formData.class} onValueChange={(value) => handleSelectChange("class", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classOption) => (
                          <SelectItem key={classOption} value={classOption}>
                            {classOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="background">Background</Label>
                    <Select value={formData.background} onValueChange={(value) => handleSelectChange("background", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select background" />
                      </SelectTrigger>
                      <SelectContent>
                        {backgrounds.map((bg) => (
                          <SelectItem key={bg} value={bg}>
                            {bg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Input 
                      id="level" 
                      name="level" 
                      value={formData.level} 
                      onChange={handleChange} 
                      type="number" 
                      min="1" 
                      max="20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alignment">Alignment</Label>
                  <Select value={formData.alignment} onValueChange={(value) => handleSelectChange("alignment", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {alignments.map((alignment) => (
                        <SelectItem key={alignment} value={alignment}>
                          {alignment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="font-medieval">Ability Scores</CardTitle>
                <CardDescription>Set your character's ability scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].map((ability) => (
                    <div key={ability} className="space-y-2">
                      <Label htmlFor={ability.toLowerCase()}>{ability}</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id={ability.toLowerCase()} 
                          name={ability.toLowerCase()} 
                          type="number" 
                          min="3" 
                          max="18" 
                          defaultValue="10"
                        />
                        <div className="bg-gray-100 border border-dnd-gold rounded-md px-3 py-1 text-center">
                          +0
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medieval mb-2">Ability Score Methods</h3>
                  <Tabs defaultValue="standard">
                    <TabsList className="mb-2">
                      <TabsTrigger value="standard">Standard Array</TabsTrigger>
                      <TabsTrigger value="point-buy">Point Buy</TabsTrigger>
                      <TabsTrigger value="roll">Roll Scores</TabsTrigger>
                    </TabsList>
                    <TabsContent value="standard" className="p-4 bg-gray-50 rounded-md">
                      Use these scores: 15, 14, 13, 12, 10, 8
                    </TabsContent>
                    <TabsContent value="point-buy" className="p-4 bg-gray-50 rounded-md">
                      Distribute 27 points among your abilities
                    </TabsContent>
                    <TabsContent value="roll" className="p-4 bg-gray-50 rounded-md">
                      <Button>Roll 4d6 (drop lowest)</Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </>
          )}
          
          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="font-medieval">Skills & Proficiencies</CardTitle>
                <CardDescription>Select your character's proficiencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medieval mb-3">Skill Proficiencies</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"].map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <input type="checkbox" id={`skill-${skill.toLowerCase()}`} className="rounded border-gray-300" />
                          <Label htmlFor={`skill-${skill.toLowerCase()}`}>{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-medieval mb-3">Saving Throws</h3>
                      <div className="space-y-2">
                        {["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].map((ability) => (
                          <div key={ability} className="flex items-center space-x-2">
                            <input type="checkbox" id={`save-${ability.toLowerCase()}`} className="rounded border-gray-300" />
                            <Label htmlFor={`save-${ability.toLowerCase()}`}>{ability}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medieval mb-3">Armor Proficiencies</h3>
                      <div className="space-y-2">
                        {["Light Armor", "Medium Armor", "Heavy Armor", "Shields"].map((armor) => (
                          <div key={armor} className="flex items-center space-x-2">
                            <input type="checkbox" id={`armor-${armor.toLowerCase().replace(/\s+/g, '-')}`} className="rounded border-gray-300" />
                            <Label htmlFor={`armor-${armor.toLowerCase().replace(/\s+/g, '-')}`}>{armor}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medieval mb-3">Weapon Proficiencies</h3>
                      <div className="space-y-2">
                        {["Simple Weapons", "Martial Weapons"].map((weapon) => (
                          <div key={weapon} className="flex items-center space-x-2">
                            <input type="checkbox" id={`weapon-${weapon.toLowerCase().replace(/\s+/g, '-')}`} className="rounded border-gray-300" />
                            <Label htmlFor={`weapon-${weapon.toLowerCase().replace(/\s+/g, '-')}`}>{weapon}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medieval mb-3">Languages</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["Common", "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Halfling", "Orc", "Abyssal", "Celestial", "Draconic", "Deep Speech", "Infernal", "Primordial", "Sylvan", "Undercommon"].map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <input type="checkbox" id={`lang-${language.toLowerCase()}`} className="rounded border-gray-300" />
                          <Label htmlFor={`lang-${language.toLowerCase()}`}>{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}
          
          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle className="font-medieval">Equipment & Background</CardTitle>
                <CardDescription>Choose your starting equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medieval mb-3">Starting Gold</h3>
                    <div className="flex items-center gap-4">
                      <div className="grid grid-cols-5 gap-2">
                        <div>
                          <Label htmlFor="platinum">PP</Label>
                          <Input id="platinum" type="number" min="0" defaultValue="0" />
                        </div>
                        <div>
                          <Label htmlFor="gold">GP</Label>
                          <Input id="gold" type="number" min="0" defaultValue="0" />
                        </div>
                        <div>
                          <Label htmlFor="electrum">EP</Label>
                          <Input id="electrum" type="number" min="0" defaultValue="0" />
                        </div>
                        <div>
                          <Label htmlFor="silver">SP</Label>
                          <Input id="silver" type="number" min="0" defaultValue="0" />
                        </div>
                        <div>
                          <Label htmlFor="copper">CP</Label>
                          <Input id="copper" type="number" min="0" defaultValue="0" />
                        </div>
                      </div>
                      <Button variant="outline">Roll Starting Gold</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medieval mb-3">Weapons</h3>
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        <Select>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select weapon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="longsword">Longsword</SelectItem>
                            <SelectItem value="shortsword">Shortsword</SelectItem>
                            <SelectItem value="greataxe">Greataxe</SelectItem>
                            <SelectItem value="dagger">Dagger</SelectItem>
                            <SelectItem value="rapier">Rapier</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">+</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medieval mb-3">Armor</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select armor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="leather">Leather Armor</SelectItem>
                            <SelectItem value="chain-shirt">Chain Shirt</SelectItem>
                            <SelectItem value="scale-mail">Scale Mail</SelectItem>
                            <SelectItem value="plate">Plate Armor</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select shield" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Shield</SelectItem>
                            <SelectItem value="shield">Shield</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medieval mb-3">Equipment Packs</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment pack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="explorer">Explorer's Pack</SelectItem>
                        <SelectItem value="dungeoneers">Dungeoneer's Pack</SelectItem>
                        <SelectItem value="burglar">Burglar's Pack</SelectItem>
                        <SelectItem value="diplomat">Diplomat's Pack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </>
          )}
          
          <CardFooter className="flex justify-between">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevStep}>
                Previous
              </Button>
            )}
            {currentStep < 4 ? (
              <Button className="bg-dnd-purple hover:bg-dnd-purple/90" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button className="bg-dnd-purple hover:bg-dnd-purple/90" onClick={handleSubmit}>
                Create Character
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CharacterCreate;
