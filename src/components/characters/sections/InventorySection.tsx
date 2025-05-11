
import { Character } from "@/types/character";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InventorySectionProps {
  character: Character;
}

const InventorySection: React.FC<InventorySectionProps> = ({ character }) => {
  // This would be hooked up to state management in a real app
  const [items, setItems] = useState(character.inventory || []);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  
  const addItem = () => {
    if (newItemName.trim() === "") {
      toast.error("Please enter an item name");
      return;
    }
    
    const newItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: parseInt(newItemQuantity) || 1,
      weight: 0
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemQuantity("1");
    toast.success(`Added ${newItemQuantity}x ${newItemName} to inventory`);
  };
  
  const removeItem = (id: string) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
    toast.success("Item removed from inventory");
  };
  
  const totalWeight = items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  
  return (
    <div>
      <h3 className="text-xl font-medieval mb-4">Inventory</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-dnd-gold rounded-lg p-4 bg-white/80">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medieval text-lg">Items</h4>
            <div className="flex items-center text-sm">
              <span>Total Weight: {totalWeight} lbs</span>
              <span className="mx-2">|</span>
              <span>Carrying Capacity: {character.abilityScores.str * 15} lbs</span>
            </div>
          </div>
          
          <div className="overflow-hidden border border-dnd-gold rounded">
            <table className="w-full">
              <thead className="bg-dnd-gold/20">
                <tr>
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Qty</th>
                  <th className="text-right p-2">Weight</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dnd-gold/30">
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id} className="bg-white/50">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-right">{item.quantity}</td>
                      <td className="p-2 text-right">{item.weight * item.quantity} lbs</td>
                      <td className="p-2 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white/50">
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No items in inventory
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-dnd-gold/10 rounded border border-dnd-gold flex items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="item-name" className="text-sm">Item Name</Label>
              <Input 
                id="item-name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="bg-white"
                placeholder="Potion of Healing"
              />
            </div>
            <div className="w-20">
              <Label htmlFor="item-quantity" className="text-sm">Qty</Label>
              <Input
                id="item-quantity"
                type="number"
                min="1"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                className="bg-white"
              />
            </div>
            <Button onClick={addItem} className="bg-dnd-purple hover:bg-dnd-purple/90">Add Item</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border border-dnd-gold rounded-lg p-4 bg-white/80">
            <h4 className="font-medieval text-lg mb-3">Currency</h4>
            <div className="space-y-2">
              {['Platinum', 'Gold', 'Electrum', 'Silver', 'Copper'].map((currency) => (
                <div key={currency} className="flex items-center justify-between">
                  <span>{currency}</span>
                  <div className="bg-white/70 border border-dnd-gold rounded p-2 w-16 text-center">
                    {character.currency?.[currency.toLowerCase() as keyof typeof character.currency] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-dnd-gold rounded-lg p-4 bg-white/80">
            <h4 className="font-medieval text-lg mb-3">Equipment</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium">Armor:</h5>
                <p className="text-sm">
                  {character.equipment?.armor?.name || 'None'} 
                  {character.equipment?.armor?.ac ? ` (AC ${character.equipment.armor.ac})` : ''}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium">Shield:</h5>
                <p className="text-sm">
                  {character.equipment?.shield?.name || 'None'}
                  {character.equipment?.shield?.bonus ? ` (+${character.equipment.shield.bonus} AC)` : ''}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium">Weapons:</h5>
                <div className="space-y-1">
                  {character.equipment?.weapons?.map((weapon, index) => (
                    <p key={index} className="text-sm">
                      {weapon.name} ({weapon.damage} {weapon.damageType})
                    </p>
                  )) || <p className="text-sm">None</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySection;
