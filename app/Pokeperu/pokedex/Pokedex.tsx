import React from 'react';
import ROUTES from '../../consts/ROUTES';
import { monsters, type Monster } from '../monsters';
import './pokedex.css';

export default function Pokedex() {
  return (
    <div className="Pokedex">
      <a href={ROUTES.pokePeru.battle}>Back</a>
      <h1>Pokedex</h1>
      <ul className="monster-list">
        {monsters.map((monster: Monster) => (
          <li key={monster.name} className="monster-item">
            <h2>{monster.name}</h2>
            <img src={monster.image} alt={monster.name} className="monster-image" />
            <p>Type: {monster.type}</p>
            {monster.secondType && <p>Secondary Type: {monster.secondType}</p>}
            <p className="monster-description">{monster.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}