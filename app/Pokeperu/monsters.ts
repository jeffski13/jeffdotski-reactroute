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
    name: 'Buxic',
    trainer: 'Lilly',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    hp: 20,
    attack: 40,
    defense: 50,
    specialAttack: 40,
    specialDefense: 50,
    speed: 100,
    type: ElementType.Poison,
    secondType: ElementType.Ghost,
    image: '/images/monsters/pkmnsquad1a.jpg',
    description: 'Buxic is a Poison/Ghost-type. When he walks he leaves poison on the ground. It\'s super toxic. He is not very friendly. He can be very bad tempered.',
    inspiration: 'Bunny', // Added inspiration
    attack1: {
      name: 'Throwing Poison',
      type: ElementType.Poison,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: 'Punching Your Face',
      type: ElementType.Ghost,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: '',
    image: '/images/monsters/pkmnsquad1b.png',
    trainer: 'Lilly',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Normal,
    secondType: null,
    attack1: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'Dragoncond',
    trainer: 'Trainer Squad 2',
    trainerImage: '/images/gymleaders/trainersquad2.png', // Added trainer image
    hp: 100,
    attack: 0,
    defense: 40,
    specialAttack: 80,
    specialDefense: 80,
    speed: 0,
    type: ElementType.Ice,
    secondType: ElementType.Dragon,
    image: '/images/monsters/pkmnsquad2a.jpg',
    description: 'This pokemon is very difficult to find. This pokemon is calm and its special attack is Ice-Fire.',
    inspiration: 'Condor', // Added inspiration
    attack1: {
      name: 'Ice-Fire',
      type: ElementType.Fire,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: 'Ice Ball',
      type: ElementType.Ice,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: '',
    trainer: 'Trainer Squad 2',
    trainerImage: '/images/gymleaders/trainersquad2.png', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad2b.png',
    attack1: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'Palka',
    trainer: 'Trainer Squad 3',
    trainerImage: '/images/gymleaders/trainersquad3.png', // Added trainer image
    hp: 10,
    attack: 40,
    defense: 90,
    specialAttack: 40,
    specialDefense: 70,
    speed: 50,
    type: ElementType.Grass,
    secondType: ElementType.Normal,
    image: '/images/monsters/pkmnsquad3a.png',
    description: 'It has vines and flowers on its fur that it can control to attack. Its fur can vary in color, usually beige and white, but brown are rare.',
    inspiration: 'Llama', // Added inspiration
    attack1: {
      name: 'Vines',
      type: ElementType.Grass,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: 'Tackle',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: '',
    trainer: 'Trainer Squad 3',
    trainerImage: '/images/gymleaders/trainersquad3.jpg', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad3b.png',
    attack1: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'Tident',
    trainer: 'Trainer Squad 4',
    trainerImage: '/images/gymleaders/trainersquad4.png', // Added trainer image
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Water,
    secondType: ElementType.Electric,
    image: '/images/monsters/pkmnsquad4a.jpg',
    description: 'It has electric spikes with in its shell and on its head. It is a seriously angry pokemon. Be careful.',
    inspiration: 'Turtle', // Added inspiration
    attack1: {
      name: 'Electric Shock',
      type: ElementType.Electric,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: 'Water Launch',
      type: ElementType.Water,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: '',
    trainer: 'Trainer Squad 4',
    trainerImage: '/images/gymleaders/trainersquad4.png', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad4b.png',
    attack1: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'Washishi',
    trainer: 'Bababoi',
    trainerImage: '/images/gymleaders/trainersquad5.png', // Added trainer image
    hp: 50,
    attack: 40,
    defense: 60,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Water,
    secondType: ElementType.Ghost,
    image: '/images/monsters/pkmnsquad5a.jpg',
    description: 'Washishi is a Water/Ghost-type Pokémon that that starts as a puddle, and finishes as a big wave. It is a defensive pokemon.',
    inspiration: 'Water', // Added inspiration
    attack1: {
      name: 'Splash',
      type: ElementType.Water,
      isPhysical: true,
      damage: 10,
      powerPoints: 20,
      accuracy: 1,
    },
    attack2: {
      name: 'Downpour',
      type: ElementType.Water,
      isPhysical: false,
      damage: 2,
      powerPoints: 60,
      accuracy: 0.4,
    },
  },
  {
    name: '',
    trainer: 'Trainer Squad 5',
    trainerImage: '/images/gymleaders/trainersquad5.png', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad5b.png',
    attack1: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'Eternal Fire',
    trainer: 'Trainer Squad 6',
    trainerImage: '/images/gymleaders/trainersquad6.jpg', // Added trainer image
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Fire,
    secondType: null,
    image: '/images/monsters/pkmnsquad6a.jpg',
    description: '',
    inspiration: 'Fire ball',
    attack1: {
      name: 'Sand Flies',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 4,
      powerPoints: 40,
      accuracy: 0.7,
    },
    attack2: {
      name: 'Bite',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 4,
      powerPoints: 40,
      accuracy: 0.7,
    },
  },
  {
    name: '',
    trainer: 'Trainer Squad 6',
    trainerImage: '/images/gymleaders/trainersquad6.jpg', // Added trainer image
    description: '',
    inspiration: '', // Added inspiration
    hp: 50,
    attack: 50,
    defense: 50,
    specialAttack: 50,
    specialDefense: 50,
    speed: 50,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad6b.png',
    attack1: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
    attack2: {
      name: '',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'Gengar',
    trainer: 'Morty',
    trainerImage: '/images/gymleaders/morty.jpg', // Added trainer image
    hp: 50,
    attack: 65,
    defense: 60,
    specialAttack: 130,
    specialDefense: 75,
    speed: 110,
    type: ElementType.Ghost,
    secondType: ElementType.Ground,
    image: '/images/monsters/gengar.png',
    attack1: {
      name: 'Shadow Ball',
      damage: 50,
      type: ElementType.Ghost,
      isPhysical: false,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Earthquake',
      damage: 50,
      type: ElementType.Ground,
      isPhysical: false,
      powerPoints: 10,
      accuracy: 1,
    },
    description: null,
    inspiration: '',
  },
];