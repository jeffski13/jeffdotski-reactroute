import './styles.css';
import { useState } from 'react';
import BattlePhase from './BattlePhase';
import MonsterSelection from './MonsterSelection';

const monsters = [
  {
    name: 'Pikachu',
    trainer: 'Lt. Surge',
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: 'Electric',
    secondType: null, // Added second type
    image: '/images/pikachu.jpg',
    attack1: {
      name: 'Quick Attack',
      damage: 10,
      type: 'Normal',
    },
    attack2: {
      name: 'Thunderbolt',
      damage: 20,
      type: 'Electric',
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
    type: 'Fire',
    secondType: null, // Added second type
    image: '/images/charmander.jpg',
    attack1: {
      name: 'Scratch',
      damage: 10,
      type: 'Normal',
    },
    attack2: {
      name: 'Flamethrower',
      damage: 20,
      type: 'Fire',
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
    type: 'Grass',
    secondType: 'Poison', // Added second type
    image: '/images/bulbasaur.jpg',
    attack1: {
      name: 'Tackle',
      damage: 10,
      type: 'Normal',
    },
    attack2: {
      name: 'Vine Whip',
      damage: 20,
      type: 'Grass',
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
    type: 'Water',
    secondType: null, // Added second type
    image: '/images/squirtle.png',
    attack1: {
      name: 'Tackle',
      damage: 10,
      type: 'Normal',
    },
    attack2: {
      name: 'Water Gun',
      damage: 20,
      type: 'Water',
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
    type: 'Normal',
    secondType: null, // Added second type
    image: '/images/eevee.png',
    attack1: {
      name: 'Quick Attack',
      damage: 10,
      type: 'Normal',
    },
    attack2: {
      name: 'Bite',
      damage: 20,
      type: 'Dark',
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
    type: 'Normal',
    secondType: 'Fairy', // Added second type
    image: '/images/jigglypuff.jpg',
    attack1: {
      name: 'Pound',
      damage: 10,
      type: 'Normal',
    },
    attack2: {
      name: 'Sing',
      damage: 0,
      type: 'Fairy', // Sing could be a status move, but for simplicity, it deals no damage here.
    },
  },
];

export default function PokePeruContent() {
  const [selectedMonstersNames, setSelectedMonstersNames] = useState<string[]>([]);
  const [selectedMonsters, setSelectedMonsters] = useState<object[]>([]);
  const [currentUser, setCurrentUser] = useState(1);

  const handleMonsterSelect = (monster: object) => {
    if (selectedMonstersNames.includes(monster.name)) return; // Prevent duplicate selection

    setSelectedMonstersNames([...selectedMonstersNames, monster.name]);
    setSelectedMonsters([...selectedMonsters, monster]);
    setCurrentUser(currentUser === 1 ? 2 : 1); // Switch user
  };

  return (
    <>
      {selectedMonstersNames.length < 2 ? (
        <MonsterSelection
          monsters={monsters}
          selectedMonstersNames={selectedMonstersNames}
          currentUser={currentUser}
          handleMonsterSelect={handleMonsterSelect}
        />
      ) : (
        <BattlePhase selectedMonsters={selectedMonsters} />
      )}
    </>
  );
}