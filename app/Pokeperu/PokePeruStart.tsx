import './styles.css';
import { useState } from 'react';
import MonsterSelectionResults from './MonsterSelectionResults';

const monsters = [
  {
    name: 'Pikachu',
    trainer: 'Ash',
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    type: 'Electric',
  },
  {
    name: 'Charmander',
    trainer: 'Brock',
    hp: 39,
    attack: 52,
    defense: 43,
    specialAttack: 60,
    specialDefense: 50,
    speed: 65,
    type: 'Fire',
  },
  {
    name: 'Bulbasaur',
    trainer: 'Misty',
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
    type: 'Grass/Poison',
  },
  {
    name: 'Squirtle',
    trainer: 'Lt. Surge',
    hp: 44,
    attack: 48,
    defense: 65,
    specialAttack: 50,
    specialDefense: 64,
    speed: 43,
    type: 'Water',
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
  },
  {
    name: 'Jigglypuff',
    trainer: 'Sabrina',
    hp: 115,
    attack: 45,
    defense: 20,
    specialAttack: 45,
    specialDefense: 25,
    speed: 20,
    type: 'Normal/Fairy',
  },
];

export default function PokePeruStart() {
  const [selectedMonsters, setSelectedMonsters] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState(1);

  const handleMonsterSelect = (monsterName: string) => {
    if (selectedMonsters.includes(monsterName)) return; // Prevent duplicate selection

    setSelectedMonsters([...selectedMonsters, monsterName]);
    setCurrentUser(currentUser === 1 ? 2 : 1); // Switch user
  };

  return (
    <div className="PokePeruStart">
      <h1>Monster Selection</h1>
      {selectedMonsters.length < 2 ? (
        <>
          <h2>User {currentUser}, choose your monster:</h2>
          <div className="monster-grid">
            {monsters.map((monster) => (
              <button
                key={monster.name}
                onClick={() => handleMonsterSelect(monster.name)}
                disabled={selectedMonsters.includes(monster.name)}
                className="monster-button"
              >
                {monster.name} (Trainer: {monster.trainer})
              </button>
            ))}
          </div>
        </>
      ) : (
        <MonsterSelectionResults selectedMonsters={selectedMonsters} />
      )}
    </div>
  );
}