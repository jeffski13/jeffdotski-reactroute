import { MonsterType } from './MonsterType';

// Define the structure of an attack
interface MonsterAttack {
  name: string;
  damage: number;
  type: MonsterType;
  isPhysical: boolean; // True for physical attacks, false for special attacks
}

// Define the structure of a monster
export interface Monster {
  name: string;
  trainer: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  type: MonsterType;
  secondType: MonsterType | null;
  image: string;
  description: string | null; // New description attribute
  attack1: MonsterAttack;
  attack2: MonsterAttack;
}

// Use the Monster interface for the monsters array
export const monsters: Monster[] = [
  {
    name: 'Pikachu',
    trainer: 'Lt. Surge',
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: MonsterType.Electric,
    secondType: null,
    image: '/images/pikachu.jpg',
    description: 'Pikachu is an Electric-type Pokémon known for its agility and powerful Thunderbolt attack.',
    attack1: {
      name: 'Quick Attack',
      damage: 10,
      type: MonsterType.Normal,
      isPhysical: true,
    },
    attack2: {
      name: 'Thunderbolt',
      damage: 20,
      type: MonsterType.Electric,
      isPhysical: false,
    },
  },
  {
    name: 'Charmander',
    trainer: 'Blaine',
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    type: MonsterType.Fire,
    secondType: null,
    image: '/images/charmander.jpg',
    description: 'Charmander is a Fire-type Pokémon that uses its fiery tail to intimidate opponents.',
    attack1: {
      name: 'Scratch',
      damage: 10,
      type: MonsterType.Normal,
      isPhysical: true,
    },
    attack2: {
      name: 'Flamethrower',
      damage: 20,
      type: MonsterType.Fire,
      isPhysical: false,
    },
  },
  {
    name: 'Bulbasaur',
    trainer: 'Erika',
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    type: MonsterType.Grass,
    secondType: MonsterType.Poison,
    image: '/images/bulbasaur.jpg',
    description: 'Bulbasaur is a Grass/Poison-type Pokémon that uses its bulb to unleash powerful attacks.',
    attack1: {
      name: 'Tackle',
      damage: 10,
      type: MonsterType.Normal,
      isPhysical: true,
    },
    attack2: {
      name: 'Vine Whip',
      damage: 20,
      type: MonsterType.Grass,
      isPhysical: false,
    },
  },
  {
    name: 'Squirtle',
    trainer: 'Misty',
    hp: 44,
    attack: 48,
    defense: 65,
    specialAttack: 50,
    specialDefense: 64,
    speed: 43,
    type: MonsterType.Water,
    secondType: null,
    image: '/images/squirtle.png',
    description: 'Squirtle is a Water-type Pokémon that uses its shell for defense and Water Gun for offense.',
    attack1: {
      name: 'Tackle',
      damage: 10,
      type: MonsterType.Normal,
      isPhysical: true,
    },
    attack2: {
      name: 'Water Gun',
      damage: 20,
      type: MonsterType.Water,
      isPhysical: false,
    },
  },
  {
    name: 'Eevee',
    trainer: 'Erika',
    hp: 55,
    attack: 55,
    defense: 50,
    specialAttack: 45,
    specialDefense: 65,
    speed: 55,
    type: MonsterType.Normal,
    secondType: null,
    image: '/images/eevee.png',
    description: 'Eevee is a Normal-type Pokémon known for its adaptability and potential to evolve into various forms.',
    attack1: {
      name: 'Quick Attack',
      damage: 10,
      type: MonsterType.Normal,
      isPhysical: true,
    },
    attack2: {
      name: 'Bite',
      damage: 20,
      type: MonsterType.Dark,
      isPhysical: true,
    },
  },
  {
    name: 'Jigglypuff',
    trainer: 'Whitney',
    hp: 115,
    attack: 45,
    defense: 20,
    specialAttack: 45,
    specialDefense: 25,
    speed: 20,
    type: MonsterType.Normal,
    secondType: MonsterType.Fairy,
    image: '/images/jigglypuff.jpg',
    description: 'Jigglypuff is a Normal/Fairy-type Pokémon that uses its singing ability to put opponents to sleep.',
    attack1: {
      name: 'Pound',
      damage: 10,
      type: MonsterType.Normal,
      isPhysical: true,
    },
    attack2: {
      name: 'Sing',
      damage: 0,
      type: MonsterType.Fairy,
      isPhysical: false,
    },
  },
];