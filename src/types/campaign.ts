
export interface Campaign {
  id: string;
  name: string;
  description: string;
  active: boolean;
  dmId: string;
  players: Array<{
    id: string;
    name: string;
    characterId?: string;
  }>;
  sessions: Array<{
    id: string;
    date: string;
    title: string;
    description?: string;
  }>;
  notes: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }>;
  npcs?: Array<{
    id: string;
    name: string;
    description: string;
    avatar?: string;
  }>;
  locations?: Array<{
    id: string;
    name: string;
    description: string;
    image?: string;
  }>;
}
