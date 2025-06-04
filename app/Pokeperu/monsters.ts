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
    name: 'Aquastride',
    trainer: 'Seb',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    hp: 65,
    attack: 60,
    defense: 55,
    specialAttack: 95,
    specialDefense: 65,
    speed: 100,
    type: ElementType.Water,
    secondType: ElementType.Psychic,
    image: '/images/monsters/pkmnsquad1b.png',
    description: 'Aquastride still has a playfull nature like Dripkin but learns its psychic power and gets more serious',
    inspiration: 'baby water horse', // Added inspiration
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
    name: 'Splishingo',
    trainer: 'Seb',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    hp: 90,
    attack: 85,
    defense: 65,
    specialAttack:125,
    specialDefense:75,
    speed:120,
    type: ElementType.Water,
    secondType: ElementType.Psychic,
    image: '/images/monsters/pkmnsquad2a.png',
    description: 'It is said Splishingo can use its infinite water source on its mane to launch at enemies with its psychic mind.',
    inspiration: 'Water horse', // Added inspiration
    attack1: {
      name: 'Hydrolyzing Mind',
      type: ElementType.Water,
      isPhysical: false,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
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
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
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
    name: 'Frostix',
    trainer: 'Logan',
    trainerImage: '/images/gymleaders/trainersquad3.png', // Added trainer image
    hp: 70,
    attack: 65,
    defense: 60,
    specialAttack: 55,
    specialDefense: 82,
    speed: 78,
    type: ElementType.Fairy,
    secondType: ElementType.Ice,
    image: '/images/monsters/pkmnsquad3b.png',
    description: 'After training in the mountains this pokemon has adapted to its environment.',
    inspiration: 'Pixie', // Added inspiration
    attack1: {
      name: 'Ice Spinner',
      type: ElementType.Ice,
      isPhysical: true,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
    attack2: {
      name: 'Moon Blast',
      type: ElementType.Fairy,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
  },
  {
    name: 'Queenstix',
    trainer: 'Logan',
    trainerImage: '/images/gymleaders/trainersquad3.png', // Added trainer image
    hp: 85,
    attack: 89,
    defense: 87,
    specialAttack: 80,
    specialDefense: 105,
    speed: 94,
    type: ElementType.Fairy,
    secondType: ElementType.Ice,
    image: '/images/monsters/pkmnsquad4a.png',
    description: 'Queenstix have conquered the moutain they are on. They protect the moutain with might.',
    inspiration: 'Pixie', // Added inspiration
    attack1: {
      name: 'Glacial Spear',
      type: ElementType.Ice,
      isPhysical: true,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.5,
    },
    attack2: {
      name: 'Ice Beam',
      type: ElementType.Ice,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.75,
    },
  },
];