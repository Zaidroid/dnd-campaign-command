export interface Campaign {
  id: string;
  name: string;
  description: string;
  active: boolean;
  setting?: string;
  startDate?: string;
  dmId: string;
  players: Array<{
    id: string;
    name: string;
    characterId?: string;
    character?: {
      name: string;
      race: string;
      class: string;
    };
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
    author?: string;
    date?: string;
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
