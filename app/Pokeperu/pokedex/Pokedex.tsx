import React from 'react';
import ROUTES from '../../consts/ROUTES';
import { monsters, type Monster } from '../monsters';
import { getTypeColor } from './typeColors';
import './pokedex.css';

export default function Pokedex() {
  return (
    <div className="Pokedex">
      <a href={ROUTES.pokePeru.battle}>Back</a>
      <h1>Pokedex</h1>
      <ul className="monster-list">
        {monsters.map((monster: Monster) => (
          <li key={monster.name} className="monster-item">
            <img src={monster.image} alt={monster.name} className="monster-image" />
            <div className="monster-details">
              <h2 className="monster-name">{monster.name}</h2>
              <div
                className="type-badge"
                style={{ backgroundColor: getTypeColor(monster.type) }}
              >
                {monster.type}
              </div>
              {monster.secondType && (
                <div
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(monster.secondType) }}
                >
                  {monster.secondType}
                </div>
              )}
              <p className="monster-description">{monster.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}