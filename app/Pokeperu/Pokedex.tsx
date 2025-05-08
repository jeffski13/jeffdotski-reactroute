import React from 'react';
import ROUTES from '../consts/ROUTES';

interface Monster {
  name: string;
  type: string;
  secondaryType?: string;
}

const monsters: Monster[] = [
  { name: 'Bulbasaur', type: 'Grass', secondaryType: 'Poison' },
  { name: 'Charmander', type: 'Fire' },
  { name: 'Squirtle', type: 'Water' },
  { name: 'Pikachu', type: 'Electric' },
  { name: 'Jigglypuff', type: 'Normal', secondaryType: 'Fairy' },
  { name: 'Eevee', type: 'Normal' },
];

export default function Pokedex() {

  return (
    <div className="Pokedex">
      <a href={ROUTES.pokePeru.battle}>Back</a>
      <h1>Pokedex</h1>
      <ul className="monster-list">
        {monsters.map((monster) => (
          <li key={monster.name} className="monster-item">
            <h2>{monster.name}</h2>
            <p>Type: {monster.type}</p>
            {monster.secondaryType && <p>Secondary Type: {monster.secondaryType}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}