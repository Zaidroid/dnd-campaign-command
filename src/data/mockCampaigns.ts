import { Campaign } from "@/types/campaign";

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "The Lost Mines of Phandelver",
    description: "A group of adventurers investigate a lost mine and the mysterious disappearance of Gundren Rockseeker.",
    active: true,
    dmId: "user1",
    players: [
      {
        id: "player1",
        name: "John",
        characterId: "1"
      },
      {
        id: "player2",
        name: "Sarah",
        characterId: "2"
      },
      {
        id: "player3",
        name: "Mike",
        characterId: "3"
      }
    ],
    sessions: [
      {
        id: "session1",
        date: "2025-05-01",
        title: "Goblin Ambush",
        description: "The party was ambushed by goblins on the road to Phandalin."
      },
      {
        id: "session2",
        date: "2025-05-08",
        title: "Cragmaw Hideout",
        description: "The party found the goblin hideout and rescued Sildar Hallwinter."
      }
    ],
    notes: [
      {
        id: "note1",
        title: "Important NPCs",
        content: "Sildar Hallwinter - Member of the Lords' Alliance\nGundren Rockseeker - Dwarf miner who hired the party\nIarno Albrek - Missing contact in Phandalin",
        createdAt: "2025-04-28"
      },
      {
        id: "note2",
        title: "Quest Hooks",
        content: "Find Gundren Rockseeker\nInvestigate the disappearance of Iarno Albrek\nInvestigate orc raids near Wyvern Tor",
        createdAt: "2025-05-02"
      }
    ],
    npcs: [
      {
        id: "npc1",
        name: "Sildar Hallwinter",
        description: "A retired soldier and member of the Lords' Alliance. He was captured by goblins along with Gundren Rockseeker."
      },
      {
        id: "npc2",
        name: "Black Spider",
        description: "A mysterious figure who seems to be behind the troubles in the area."
      }
    ],
    locations: [
      {
        id: "loc1",
        name: "Phandalin",
        description: "A small frontier town built on the ruins of a much older settlement."
      },
      {
        id: "loc2",
        name: "Cragmaw Hideout",
        description: "A cave where goblins from the Cragmaw tribe have made their base."
      }
    ]
  },
  {
    id: "2",
    name: "Curse of Strahd",
    description: "Dark powers have trapped the players in the dread realm of Barovia, ruled by the vampire Count Strahd von Zarovich.",
    active: true,
    dmId: "user1",
    players: [
      {
        id: "player1",
        name: "John",
        characterId: "4"
      },
      {
        id: "player4",
        name: "Lisa",
        characterId: "5"
      },
      {
        id: "player5",
        name: "Dmitri",
        characterId: "6"
      }
    ],
    sessions: [
      {
        id: "session1",
        date: "2025-04-15",
        title: "Welcome to Barovia",
        description: "The party finds themselves trapped in a mysterious, foggy land."
      }
    ],
    notes: [
      {
        id: "note1",
        title: "Fortunes of Ravenloft",
        content: "The cards foretell: The Holy Symbol is in Krezk, the Tome is in the Abbey, and the Sunsword is at Argynvostholt.",
        createdAt: "2025-04-15"
      }
    ],
    npcs: [
      {
        id: "npc1",
        name: "Ireena Kolyana",
        description: "A woman who bears a striking resemblance to Strahd's long-lost love."
      },
      {
        id: "npc2",
        name: "Strahd von Zarovich",
        description: "The vampire lord who rules over Barovia with an iron fist."
      }
    ],
    locations: [
      {
        id: "loc1",
        name: "Village of Barovia",
        description: "A gloomy, oppressive village in the shadow of Castle Ravenloft."
      },
      {
        id: "loc2",
        name: "Castle Ravenloft",
        description: "The imposing castle home of Count Strahd, perched on a tall spire of rock."
      }
    ]
  },
  {
    id: "3",
    name: "Rime of the Frostmaiden",
    description: "The adventure is set in Icewind Dale, a frigid arctic region with harsh weather conditions.",
    active: false,
    dmId: "user2",
    players: [
      {
        id: "user1",
        name: "You",
        characterId: "7"
      },
      {
        id: "player6",
        name: "Alex",
        characterId: "8"
      }
    ],
    sessions: [
      {
        id: "session1",
        date: "2025-03-10",
        title: "Cold Welcome",
        description: "The party arrives in Ten-Towns during the endless night."
      },
      {
        id: "session2",
        date: "2025-03-17",
        title: "Mountain Climb",
        description: "The party investigates strange occurrences at Kelvin's Cairn."
      }
    ],
    notes: [
      {
        id: "note1",
        title: "Ten-Towns",
        content: "The ten settlements: Bryn Shander, Targos, Bremen, Termalaine, Goodmead, Dougan's Hole, Easthaven, Caer-Konig, Caer-Dineval, and Lonelywood.",
        createdAt: "2025-03-08"
      }
    ],
    npcs: [
      {
        id: "npc1",
        name: "Speaker Duvessa Shane",
        description: "The youngest speaker in the history of Bryn Shander."
      }
    ],
    locations: [
      {
        id: "loc1",
        name: "Bryn Shander",
        description: "The largest settlement in Icewind Dale, surrounded by a wooden palisade."
      }
    ]
  }
];
