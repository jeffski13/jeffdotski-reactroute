import React from 'react';
import ROUTES from '../consts/ROUTES';

interface MonsterSelectionProps {
  monsters: {
    name: string;
    trainer: string;
    image: string;
  }[];
  selectedMonstersNames: string[];
  currentUser: number;
  handleMonsterSelect: (monster: object) => void;
}

export default function MonsterSelection({
  monsters,
  selectedMonstersNames,
  currentUser,
  handleMonsterSelect,
}: MonsterSelectionProps) {
  return (
    <div className="PokePeruStart">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Monster Selection</h1>
        <a href={ROUTES.pokePeru.pokedex} className="pokedex-button">Pokedex</a>
      </div>
      <h2>User {currentUser}, choose your monster:</h2>
      <div className="monster-grid">
        {monsters.map((monster) => (
          <button
            key={monster.name}
            onClick={() => handleMonsterSelect(monster)}
            disabled={selectedMonstersNames.includes(monster.name)}
            className="monster-button"
          >
            <div>{monster.name}</div>
            <div>(Gym Leader: {monster.trainer})</div>
            <img src={monster.image} alt={monster.name} className="monster-image" />
          </button>
        ))}
      </div>
    </div>
  );
}