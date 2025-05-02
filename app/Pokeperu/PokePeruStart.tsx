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
    image: '/images/pikachu.jpg', // Add image path
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
    image: '/images/charmander.jpg',
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
    image: '/images/bulbasaur.jpg',
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
    image: '/images/squirtle.png',
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
    image: '/images/eevee.png',
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
    image: '/images/jigglypuff.jpg',
  },
];

export default function PokePeruStart() {
  const [selectedMonstersNames, setSelectedMonstersNames] = useState<string[]>([]);
  const [selectedMonsters, setSelectedMonsters] = useState<object[]>([]);
  const [currentUser, setCurrentUser] = useState(1);

  const handleMonsterSelect = (monster: object) => {
    console.log('handleMonsterSelect')
    if (selectedMonstersNames.includes(monster.name)) return; // Prevent duplicate selection

    setSelectedMonstersNames([...selectedMonstersNames, monster.name]);
    setSelectedMonsters([...selectedMonsters, monster]);
    setCurrentUser(currentUser === 1 ? 2 : 1); // Switch user
  };

  return (
    <div className="PokePeruStart">
      <h1>Monster Selection</h1>
      {selectedMonstersNames.length < 2 ? (
        <>
          <h2>User {currentUser}, choose your monster:</h2>
          <div className="monster-grid">
            {monsters.map((monster) => (
              <button
                key={monster.name}
                onClick={() => handleMonsterSelect(monster)}
                disabled={selectedMonstersNames.includes(monster.name)}
                className="monster-button"
              >
                <div>
                  {monster.name} (Trainer: {monster.trainer})
                </div>
                <img src={monster.image} alt={monster.name} className="monster-image" />
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