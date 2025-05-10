import React from 'react';
import ROUTES from '../../consts/ROUTES';
import { monsters, type Monster } from '../monsters';
import { getTypeColor } from './typeColors';
import './pokedex.css';

export default function Pokedex() {
  return (
    <div className="Pokedex">
      <div className="header">
        <a href={ROUTES.pokePeru.battle} className="back-button">
          <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
        </a>
        <div className="title-container">
          <h1>Pokedex</h1>
          <img src="/images/pokedex-icon.png" alt="Pokedex" className="pokedex-icon" />
        </div>
      </div>
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