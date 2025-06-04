import { ElementType } from './ElementType';

// Define the structure of an attack
export interface MonsterAttack {
  name: string;
  type: ElementType;
  isPhysical: boolean; // True for physical attacks, false for special attacks
  damage: number;
  powerPoints: number; // New attribute for Power Points (PP)
  accuracy: Number;
}

// Define the structure of a monster
export interface Monster {
  name: string;
  trainer: string;
  trainerImage: string; // Add this line for the trainer image
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  type: ElementType;
  secondType: ElementType | null;
  image: string;
  description: string | null;
  attack1: MonsterAttack;
  attack2: MonsterAttack;
  inspiration: string; // New property for inspiration
}

// Use the Monster interface for the monsters array
export const monsters: Monster[] = [
  {
    name: 'Dripkin',
    trainer: 'Seb',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    hp: 50,
    attack: 30,
    defense: 30,
    specialAttack: 70,
    specialDefense: 40,
    speed: 80,
    type: ElementType.Water,
    secondType: null,
    image: '/images/monsters/pkmnsquad1a.png',
    description: 'Dripkin is a playfull pokemon who loves to play with water',
    inspiration: 'Water Droplet', // Added inspiration
    attack1: {
      name: 'Plop',
      type: ElementType.Water,
      isPhysical: false,
      damage: 25,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Mental Wave',
      type: ElementType.Psychic,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
  },
  {
    name: 'Pixtix',
    trainer: 'Logan',
    trainerImage: '/images/gymleaders/trainersquad3.png', // Added trainer image
    hp: 50,
    attack: 35,
    defense: 45,
    specialAttack: 48,
    specialDefense: 64,
    speed: 58,
    type: ElementType.Fairy,
    secondType: null,
    image: '/images/monsters/pkmnsquad3a.png',
    description: 'This pokemon is found on cold mountains. Many trainers think they were left behind but really go there to train.',
    inspiration: 'Pixie', // Added inspiration
    attack1: {
      name: 'Pixie Punch',
      type: ElementType.Fairy,
      isPhysical: true,
      damage: 25,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Fairy Wind',
      type: ElementType.Fairy,
      isPhysical: false,
      damage: 25,
      powerPoints: 10,
      accuracy: 1,
    },
  },
  {
    name: 'Raymi',
    trainer: 'Inty',
    trainerImage: '/images/gymleaders/trainersquad3.png', // Added trainer image
    description: 'It is friendly but usually is scares people.',
    inspiration: 'Legend Sun God', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 30,
    specialAttack: 80,
    specialDefense: 40,
    speed: 50,
    type: ElementType.Ghost,
    secondType: null,
    image: '/images/monsters/pkmnsquad3b.png',
    attack1: {
      name: 'Canyon Ghost',
      type: ElementType.Ghost,
      isPhysical: false,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
    attack2: {
      name: 'Maldition',
      type: ElementType.Ghost,
      isPhysical: false,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
  },
  {
    name: 'Tident',
    trainer: 'Ainbo',
    trainerImage: '/images/gymleaders/trainersquad4.png', // Added trainer image
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Water,
    secondType: ElementType.Electric,
    image: '/images/monsters/pkmnsquad4a.png',
    description: 'It has electric spikes within its shell and on its head. It is a seriously angry pokemon. Be careful.',
    inspiration: 'Turtle', // Added inspiration
    attack1: {
      name: 'Electric Shock',
      type: ElementType.Electric,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
    attack2: {
      name: 'Water Launch',
      type: ElementType.Water,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
  },
  {
    name: 'Rotie',
    trainer: 'Ainbo',
    trainerImage: '/images/gymleaders/trainersquad4.png', // Added trainer image
    description: 'A tree pokemon. He is happy dangerous and brave. ',
    inspiration: 'Tree', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Grass,
    secondType: ElementType.Fighting,
    image: '/images/monsters/pkmnsquad4b.png',
    attack1: {
      name: 'Lance shot',
      type: ElementType.Fighting,
      isPhysical: true,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
    attack2: {
      name: 'Branch Paralysis',
      type: ElementType.Grass,
      isPhysical: true,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
  },
  {
    name: 'Washishi',
    trainer: 'Bababoy',
    trainerImage: '/images/gymleaders/trainersquad5.png', // Added trainer image
    hp: 50,
    attack: 40,
    defense: 60,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Water,
    secondType: ElementType.Ghost,
    image: '/images/monsters/pkmnsquad5a.png',
    description: 'Washishi is a Water/Ghost-type Pokémon that that starts as a puddle, and finishes as a big wave. It is a defensive pokemon.',
    inspiration: 'Water', // Added inspiration
    attack1: {
      name: 'Splash',
      type: ElementType.Water,
      isPhysical: true,
      damage: 25,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Downpour',
      type: ElementType.Water,
      isPhysical: false,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
  },
  {
    name: 'Tsumtsum',
    trainer: 'Bababoy',
    trainerImage: '/images/gymleaders/trainersquad5.png', // Added trainer image
    description: 'It is a big wave that cries alot. It is the most powerful evolution of Washishi. It is more powerful when it rains. It can carry out to sea.',
    inspiration: 'Tsunami', // Added inspiration
    hp: 65,
    attack: 55,
    defense: 70,
    specialAttack: 40,
    specialDefense: 50,
    speed: 20,
    type: ElementType.Water,
    secondType: null,
    image: '/images/monsters/pkmnsquad5b.png',
    attack1: {
      name: 'Wave',
      type: ElementType.Water,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
    attack2: {
      name: 'Tsunami',
      type: ElementType.Water,
      isPhysical: false,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
  },
  {
    name: 'Tornado',
    trainer: 'Alex',
    trainerImage: '/images/gymleaders/trainersquad6.png', // Added trainer image
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Fire,
    secondType: null,
    image: '/images/monsters/pkmnsquad6a.png',
    description: '',
    inspiration: 'Fire ball',
    attack1: {
      name: 'Sand Flies',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
    attack2: {
      name: 'Bite',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
  },
  {
    name: 'Eternal Fire',
    trainer: 'Alex',
    trainerImage: '/images/gymleaders/trainersquad6.png', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 100,
    attack: 70,
    defense: 50,
    specialAttack: 30,
    specialDefense: 30,
    speed: 30,
    type: ElementType.Fire,
    secondType: null,
    image: '/images/monsters/pkmnsquad6b.png',
    attack1: {
      name: 'Sand Flying',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
    attack2: {
      name: 'Fly as Light',
      type: ElementType.Flying,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
  },
];