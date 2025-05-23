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
    name: 'PkmnSquad 1A',
    trainer: 'Trainer Squad 1',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: ElementType.Electric,
    secondType: null,
    image: '/images/monsters/pkmnsquad1.png',
    description: 'Pikachu is an Electric-type Pokémon known for its agility and powerful Thunderbolt attack.',
    inspiration: 'Mouse', // Added inspiration
    attack1: {
      name: 'Quick Attack',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 20,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Thunderbolt',
      type: ElementType.Electric,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'PkmnSquad 1B',
    trainer: 'Trainer Squad 1',
    trainerImage: '/images/gymleaders/trainersquad1.png', // Added trainer image
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    type: ElementType.Fire,
    secondType: null,
    image: '/images/monsters/pkmnsquad1.png',
    description: 'Charmander is a Fire-type Pokémon that uses its fiery tail to intimidate opponents.',
    inspiration: 'Lizard', // Added inspiration
    attack1: {
      name: 'Scratch',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.4,
    },
    attack2: {
      name: 'Flamethrower',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 30,
      powerPoints: 10,
      accuracy: 1,
    },
  },
  {
    name: 'PkmnSquad 2A',
    trainer: 'Trainer Squad 2',
    trainerImage: '/images/gymleaders/trainersquad2.png', // Added trainer image
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    type: ElementType.Grass,
    secondType: ElementType.Poison,
    image: '/images/monsters/pkmnsquad2.png',
    description: 'Bulbasaur is a Grass/Poison-type Pokémon that uses its bulb to unleash powerful attacks.',
    inspiration: 'Seed and Frog', // Added inspiration
    attack1: {
      name: 'Tackle',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 10,
      powerPoints: 35,
      accuracy: 0.95,
    },
    attack2: {
      name: 'Vine Whip',
      type: ElementType.Grass,
      isPhysical: false,
      damage: 20,
      powerPoints: 25,
      accuracy: 0.9,
    },
  },
  {
    name: 'PkmnSquad 2B',
    trainer: 'Trainer Squad 2',
    trainerImage: '/images/gymleaders/trainersquad2.png', // Added trainer image
    hp: 44,
    attack: 48,
    defense: 65,
    specialAttack: 50,
    specialDefense: 64,
    speed: 43,
    type: ElementType.Water,
    secondType: null,
    image: '/images/monsters/pkmnsquad2.png',
    description: 'Squirtle is a Water-type Pokémon that uses its shell for defense and Water Gun for offense.',
    inspiration: 'Turtle', // Added inspiration
    attack1: {
      name: 'Tackle',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 10,
      powerPoints: 35,
      accuracy: 0.95,
    },
    attack2: {
      name: 'Water Gun',
      type: ElementType.Water,
      isPhysical: false,
      damage: 20,
      powerPoints: 25,
      accuracy: 0.9,
    },
  },
  {
    name: 'PkmnSquad 3A',
    trainer: 'Trainer Squad 3',
    trainerImage: '/images/gymleaders/trainersquad3.jpg', // Added trainer image
    hp: 55,
    attack: 55,
    defense: 50,
    specialAttack: 45,
    specialDefense: 65,
    speed: 55,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad3.jpg',
    description: 'Eevee is a Normal-type Pokémon known for its adaptability and potential to evolve into various forms.',
    inspiration: 'Fox and Dog', // Added inspiration
    attack1: {
      name: 'Quick Attack',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 30,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Bite',
      type: ElementType.Dark,
      isPhysical: true,
      damage: 50,
      powerPoints: 4,
      accuracy: 0.8,
    },
  },
  {
    name: 'PkmnSquad 3B',
    trainer: 'Trainer Squad 3',
    trainerImage: '/images/gymleaders/trainersquad3.jpg', // Added trainer image
    hp: 115,
    attack: 45,
    defense: 20,
    specialAttack: 45,
    specialDefense: 25,
    speed: 20,
    type: ElementType.Normal,
    secondType: ElementType.Fairy,
    image: '/images/monsters/pkmnsquad3.jpg',
    description: 'Jigglypuff is a Normal/Fairy-type Pokémon that uses its singing ability to put opponents to sleep.',
    inspiration: 'Balloon', // Added inspiration
    attack1: {
      name: 'Pound',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 30,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Double Slap',
      type: ElementType.Fairy,
      isPhysical: false,
      damage: 50,
      powerPoints: 4,
      accuracy: 0.8,
    },
  },
  {
    name: 'PkmnSquad 4A',
    trainer: 'Trainer Squad 4',
    trainerImage: '/images/gymleaders/trainersquad4.png', // Added trainer image
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: ElementType.Electric,
    secondType: null,
    image: '/images/monsters/pkmnsquad4.png',
    description: 'Pikachu is an Electric-type Pokémon known for its agility and powerful Thunderbolt attack.',
    inspiration: 'Mouse', // Added inspiration
    attack1: {
      name: 'Quick Attack',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 20,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Thunderbolt',
      type: ElementType.Electric,
      isPhysical: false,
      damage: 40,
      powerPoints: 4,
      accuracy: 0.7,
    },
  },
  {
    name: 'PkmnSquad 4B',
    trainer: 'Trainer Squad 4',
    trainerImage: '/images/gymleaders/trainersquad4.png', // Added trainer image
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    type: ElementType.Fire,
    secondType: null,
    image: '/images/monsters/pkmnsquad4.png',
    description: 'Charmander is a Fire-type Pokémon that uses its fiery tail to intimidate opponents.',
    inspiration: 'Lizard', // Added inspiration
    attack1: {
      name: 'Scratch',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 60,
      powerPoints: 2,
      accuracy: 0.4,
    },
    attack2: {
      name: 'Flamethrower',
      type: ElementType.Fire,
      isPhysical: true,
      damage: 30,
      powerPoints: 10,
      accuracy: 1,
    },
  },
  {
    name: 'PkmnSquad 5A',
    trainer: 'Trainer Squad 5',
    trainerImage: '/images/gymleaders/trainersquad5.png', // Added trainer image
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    type: ElementType.Grass,
    secondType: ElementType.Poison,
    image: '/images/monsters/pkmnsquad5.png',
    description: 'Bulbasaur is a Grass/Poison-type Pokémon that uses its bulb to unleash powerful attacks.',
    inspiration: 'Seed and Frog', // Added inspiration
    attack1: {
      name: 'Tackle',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 10,
      powerPoints: 35,
      accuracy: 0.95,
    },
    attack2: {
      name: 'Vine Whip',
      type: ElementType.Grass,
      isPhysical: false,
      damage: 20,
      powerPoints: 25,
      accuracy: 0.9,
    },
  },
  {
    name: 'PkmnSquad 5B',
    trainer: 'Trainer Squad 5',
    trainerImage: '/images/gymleaders/trainersquad5.png', // Added trainer image
    hp: 44,
    attack: 48,
    defense: 65,
    specialAttack: 50,
    specialDefense: 64,
    speed: 43,
    type: ElementType.Water,
    secondType: null,
    image: '/images/monsters/pkmnsquad5.png',
    description: 'Squirtle is a Water-type Pokémon that uses its shell for defense and Water Gun for offense.',
    inspiration: 'Turtle', // Added inspiration
    attack1: {
      name: 'Tackle',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 10,
      powerPoints: 35,
      accuracy: 0.95,
    },
    attack2: {
      name: 'Water Gun',
      type: ElementType.Water,
      isPhysical: false,
      damage: 20,
      powerPoints: 25,
      accuracy: 0.9,
    },
  },
  {
    name: 'PkmnSquad 6A',
    trainer: 'Trainer Squad 6',
    trainerImage: '/images/gymleaders/trainersquad6.jpg', // Added trainer image
    hp: 55,
    attack: 55,
    defense: 50,
    specialAttack: 45,
    specialDefense: 65,
    speed: 55,
    type: ElementType.Normal,
    secondType: null,
    image: '/images/monsters/pkmnsquad6.jpg',
    description: 'Eevee is a Normal-type Pokémon known for its adaptability and potential to evolve into various forms.',
    inspiration: 'Fox and Dog', // Added inspiration
    attack1: {
      name: 'Quick Attack',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 30,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Bite',
      type: ElementType.Dark,
      isPhysical: true,
      damage: 50,
      powerPoints: 4,
      accuracy: 0.8,
    },
  },
  {
    name: 'PkmnSquad 6B',
    trainer: 'Trainer Squad 6',
    trainerImage: '/images/gymleaders/trainersquad6.jpg', // Added trainer image
    hp: 115,
    attack: 45,
    defense: 20,
    specialAttack: 45,
    specialDefense: 25,
    speed: 20,
    type: ElementType.Normal,
    secondType: ElementType.Fairy,
    image: '/images/monsters/pkmnsquad6.jpg',
    description: 'Jigglypuff is a Normal/Fairy-type Pokémon that uses its singing ability to put opponents to sleep.',
    inspiration: 'Balloon', // Added inspiration
    attack1: {
      name: 'Pound',
      type: ElementType.Normal,
      isPhysical: true,
      damage: 30,
      powerPoints: 10,
      accuracy: 1,
    },
    attack2: {
      name: 'Double Slap',
      type: ElementType.Fairy,
      isPhysical: false,
      damage: 50,
      powerPoints: 4,
      accuracy: 0.8,
    },
  },
];