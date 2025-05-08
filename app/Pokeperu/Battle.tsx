import React, { useState } from 'react';
import './styles.css';
import './battle.css';

interface BattleProps {
  selectedMonsters: {
    name: string;
    trainer: string;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    type: string;
    secondType: string | null;
    image: string;
    attack1: {
      name: string;
      damage: number;
      type: string;
    };
    attack2: {
      name: string;
      damage: number;
      type: string;
    };
  }[];
}

export default function Battle({ selectedMonsters }: BattleProps) {
  console.log('Selected Monsters:', selectedMonsters);

  // Determine the first turn based on speed
  const isMonster1First = selectedMonsters[0].speed >= selectedMonsters[1].speed;
  const [monster1Hp, setMonster1Hp] = useState(selectedMonsters[0].hp);
  const [monster2Hp, setMonster2Hp] = useState(selectedMonsters[1].hp);
  const [isMonster1Turn, setIsMonster1Turn] = useState(isMonster1First); // Track whose turn it is

  const handleAttack = (attacker: number, damage: number, attackType: string) => {
    const attackerMonster = selectedMonsters[attacker - 1];
    const defenderMonster = selectedMonsters[attacker === 1 ? 1 : 0];

    // Adjust damage based on attack type and monster types
    let adjustedDamage = damage;

    // Double damage if attack type matches attacker's type or second type
    if (attackerMonster.type === attackType || attackerMonster.secondType === attackType) {
      adjustedDamage *= 2;
    }

    // Double damage if attack type is strong against defender's type or second type
    if (attackType === 'fire' && (defenderMonster.type === 'grass' || defenderMonster.secondType === 'grass')) {
      adjustedDamage *= 2;
    } else if (attackType === 'water' && (defenderMonster.type === 'fire' || defenderMonster.secondType === 'fire')) {
      adjustedDamage *= 2;
    } else if (attackType === 'grass' && (defenderMonster.type === 'water' || defenderMonster.secondType === 'water')) {
      adjustedDamage *= 2;
    }

    // Halve damage if attack type is weak against defender's type or second type
    if (attackType === 'fire' && (defenderMonster.type === 'ground' || defenderMonster.secondType === 'ground')) {
      adjustedDamage /= 2;
    } else if (attackType === 'water' && (defenderMonster.type === 'grass' || defenderMonster.secondType === 'grass')) {
      adjustedDamage /= 2;
    } else if (attackType === 'grass' && (defenderMonster.type === 'fire' || defenderMonster.secondType === 'fire')) {
      adjustedDamage /= 2;
    }

    if (attacker === 1) {
      setMonster2Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0)); // Monster 1 attacks Monster 2
      setIsMonster1Turn(false); // Switch to Monster 2's turn
    } else {
      setMonster1Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0)); // Monster 2 attacks Monster 1
      setIsMonster1Turn(true); // Switch to Monster 1's turn
    }
  };

  const calculateHpPercentage = (currentHp: number, maxHp: number) => {
    return (currentHp / maxHp) * 100;
  };

  const isGameOver = monster1Hp === 0 || monster2Hp === 0; // Check if the game is over

  return (
    <div className="Battle">
      <h1>Battle Time!</h1>
      <div className="battle-container">
        <div className="monster">
          <div>
            <h3>Trainer: {selectedMonsters[0].trainer}</h3>
            <h2>{selectedMonsters[0].name}</h2>
            <img src={selectedMonsters[0].image} alt={selectedMonsters[0].name} className="monster-image" />
          </div>
          <p>HP: {monster1Hp}</p>
          <div className="hp-bar">
            <div
              className="hp-bar-fill"
              style={{
                width: `${calculateHpPercentage(monster1Hp, selectedMonsters[0].hp)}%`,
              }}
            ></div>
          </div>
          <button
            onClick={() => handleAttack(1, selectedMonsters[0].attack1.damage, selectedMonsters[0].attack1.type)}
            disabled={!isMonster1Turn || monster2Hp === 0 || isGameOver}
            className={!isMonster1Turn || monster2Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack1.name}
          </button>
          <button
            onClick={() => handleAttack(1, selectedMonsters[0].attack2.damage, selectedMonsters[0].attack2.type)}
            disabled={!isMonster1Turn || monster2Hp === 0 || isGameOver}
            className={!isMonster1Turn || monster2Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack2.name}
          </button>
        </div>
        <div className="monster">
          <h3>Trainer: {selectedMonsters[1].trainer}</h3>
          <h2>{selectedMonsters[1].name}</h2>
          <img src={selectedMonsters[1].image} alt={selectedMonsters[1].name} className="monster-image" />
          <p>HP: {monster2Hp}</p>
          <div className="hp-bar">
            <div
              className="hp-bar-fill"
              style={{
                width: `${calculateHpPercentage(monster2Hp, selectedMonsters[1].hp)}%`,
              }}
            ></div>
          </div>
          <button
            onClick={() => handleAttack(2, selectedMonsters[1].attack1.damage, selectedMonsters[1].attack1.type)}
            disabled={isMonster1Turn || monster1Hp === 0 || isGameOver}
            className={isMonster1Turn || monster1Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[1].attack1.name}
          </button>
          <button
            onClick={() => handleAttack(2, selectedMonsters[1].attack2.damage, selectedMonsters[1].attack2.type)}
            disabled={isMonster1Turn || monster1Hp === 0 || isGameOver}
            className={isMonster1Turn || monster1Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[1].attack2.name}
          </button>
        </div>
      </div>
      {monster1Hp === 0 && <h2>{selectedMonsters[1].name} Wins!</h2>}
      {monster2Hp === 0 && <h2>{selectedMonsters[0].name} Wins!</h2>}
    </div>
  );
}