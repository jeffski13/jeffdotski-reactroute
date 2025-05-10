import { useState } from 'react';
import '../styles.css';
import './battle.css';
import { MonsterType } from '../MonsterType';
import type { Monster } from '../monsters';

interface BattleProps {
  selectedMonsters: Monster[];
}

export const calculateAdjustedDamage = (
  attackerMonster: Monster,
  defenderMonster: Monster,
  attackBaseDamage: number,
  attackType: MonsterType,
  isPhysical: boolean
): number => {
  
  const typeEffectiveness = (attackType: MonsterType, defenderType: MonsterType | null) => {
    if (!defenderType) return 1; // No second type

    const effectivenessChart: Record<MonsterType, { x0: MonsterType[]; x0_5: MonsterType[]; x2: MonsterType[] }> = {
      [MonsterType.Normal]: { x0: [MonsterType.Ghost], x0_5: [MonsterType.Rock, MonsterType.Steel], x2: [] },
      [MonsterType.Fire]: { x0: [], x0_5: [MonsterType.Fire, MonsterType.Water, MonsterType.Rock, MonsterType.Dragon], x2: [MonsterType.Grass, MonsterType.Ice, MonsterType.Bug, MonsterType.Steel] },
      [MonsterType.Water]: { x0: [], x0_5: [MonsterType.Water, MonsterType.Grass, MonsterType.Dragon], x2: [MonsterType.Fire, MonsterType.Ground, MonsterType.Rock] },
      [MonsterType.Electric]: { x0: [MonsterType.Ground], x0_5: [MonsterType.Electric, MonsterType.Grass, MonsterType.Dragon], x2: [MonsterType.Water, MonsterType.Flying] },
      [MonsterType.Grass]: { x0: [], x0_5: [MonsterType.Fire, MonsterType.Grass, MonsterType.Poison, MonsterType.Flying, MonsterType.Bug, MonsterType.Dragon, MonsterType.Steel], x2: [MonsterType.Water, MonsterType.Ground, MonsterType.Rock] },
      [MonsterType.Ice]: { x0: [], x0_5: [MonsterType.Fire, MonsterType.Water, MonsterType.Ice, MonsterType.Steel], x2: [MonsterType.Grass, MonsterType.Ground, MonsterType.Flying, MonsterType.Dragon] },
      [MonsterType.Fighting]: { x0: [MonsterType.Ghost], x0_5: [MonsterType.Poison, MonsterType.Flying, MonsterType.Psychic, MonsterType.Bug, MonsterType.Fairy], x2: [MonsterType.Normal, MonsterType.Ice, MonsterType.Rock, MonsterType.Dark, MonsterType.Steel] },
      [MonsterType.Poison]: { x0: [MonsterType.Steel], x0_5: [MonsterType.Poison, MonsterType.Ground, MonsterType.Rock, MonsterType.Ghost], x2: [MonsterType.Grass, MonsterType.Fairy] },
      [MonsterType.Ground]: { x0: [MonsterType.Flying], x0_5: [MonsterType.Grass, MonsterType.Bug], x2: [MonsterType.Fire, MonsterType.Electric, MonsterType.Poison, MonsterType.Rock, MonsterType.Steel] },
      [MonsterType.Flying]: { x0: [], x0_5: [MonsterType.Electric, MonsterType.Rock, MonsterType.Steel], x2: [MonsterType.Grass, MonsterType.Fighting, MonsterType.Bug] },
      [MonsterType.Psychic]: { x0: [MonsterType.Dark], x0_5: [MonsterType.Psychic, MonsterType.Steel], x2: [MonsterType.Fighting, MonsterType.Poison] },
      [MonsterType.Bug]: { x0: [], x0_5: [MonsterType.Fire, MonsterType.Fighting, MonsterType.Poison, MonsterType.Flying, MonsterType.Ghost, MonsterType.Steel, MonsterType.Fairy], x2: [MonsterType.Grass, MonsterType.Psychic, MonsterType.Dark] },
      [MonsterType.Rock]: { x0: [], x0_5: [MonsterType.Fighting, MonsterType.Ground, MonsterType.Steel], x2: [MonsterType.Fire, MonsterType.Ice, MonsterType.Flying, MonsterType.Bug] },
      [MonsterType.Ghost]: { x0: [MonsterType.Normal], x0_5: [MonsterType.Dark], x2: [MonsterType.Psychic, MonsterType.Ghost] },
      [MonsterType.Dragon]: { x0: [MonsterType.Fairy], x0_5: [MonsterType.Steel], x2: [MonsterType.Dragon] },
      [MonsterType.Dark]: { x0: [], x0_5: [MonsterType.Fighting, MonsterType.Dark, MonsterType.Fairy], x2: [MonsterType.Psychic, MonsterType.Ghost] },
      [MonsterType.Steel]: { x0: [], x0_5: [MonsterType.Fire, MonsterType.Water, MonsterType.Electric, MonsterType.Steel], x2: [MonsterType.Ice, MonsterType.Rock, MonsterType.Fairy] },
      [MonsterType.Fairy]: { x0: [], x0_5: [MonsterType.Fire, MonsterType.Poison, MonsterType.Steel], x2: [MonsterType.Fighting, MonsterType.Dragon, MonsterType.Dark] },
    };

    if (effectivenessChart[attackType].x0.includes(defenderType)) return 0;
    if (effectivenessChart[attackType].x0_5.includes(defenderType)) return 0.5;
    if (effectivenessChart[attackType].x2.includes(defenderType)) return 2;
    return 1;
  };

  
  
  // Calculate adjusted damage using the provided formula
  const A = isPhysical ? attackerMonster.attack : attackerMonster.specialAttack;
  const D = isPhysical ? defenderMonster.defense : defenderMonster.specialDefense;
  
  let level = 25;
  let criticalHitFactor = 1;
  let adjustedDamage = (((((2*level*criticalHitFactor)/5) + 2) * attackBaseDamage * (A/D))/50) + 2

  // Adjust damage based on type effectiveness
  const primaryEffectiveness = typeEffectiveness(attackType, defenderMonster.type);
  const secondaryEffectiveness = typeEffectiveness(attackType, defenderMonster.secondType);
  adjustedDamage *= primaryEffectiveness * secondaryEffectiveness;

  // STAB (Same Type Attack Bonus)
  if (attackerMonster.type === attackType || attackerMonster.secondType === attackType) {
    adjustedDamage *= 2;
  }
  
  const Z = Math.random() * (255 - 217) + 217; // Random number between 217 and 255
  const randomFactor = Z / 255; // Normalize to 0-1 range
  adjustedDamage *= randomFactor; // Apply random factor
  
  // Round the final adjusted damage to remove decimals
  return Math.round(adjustedDamage);
};

export default function Battle({ selectedMonsters }: BattleProps) {
  console.log('Selected Monsters:', selectedMonsters);

  // Determine the first turn based on speed
  const isMonster1First = selectedMonsters[0].speed >= selectedMonsters[1].speed;
  const [monster1Hp, setMonster1Hp] = useState(selectedMonsters[0].hp);
  const [monster2Hp, setMonster2Hp] = useState(selectedMonsters[1].hp);
  const [isMonster1Turn, setIsMonster1Turn] = useState(isMonster1First); // Track whose turn it is
  const [attackResult, setAttackResult] = useState<string | null>(null); // Track the result of the last attack

  const handleAttack = (attacker: number, damage: number, attackType: MonsterType, isPhysical: boolean) => {
    const attackerMonster = selectedMonsters[attacker - 1];
    const defenderMonster = selectedMonsters[attacker === 1 ? 1 : 0];

    const adjustedDamage = calculateAdjustedDamage(attackerMonster, defenderMonster, damage, attackType, isPhysical);

    if (attacker === 1) {
      setMonster2Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0)); // Monster 1 attacks Monster 2
      setIsMonster1Turn(false); // Switch to Monster 2's turn
    } else {
      setMonster1Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0)); // Monster 2 attacks Monster 1
      setIsMonster1Turn(true); // Switch to Monster 1's turn
    }

    // Set the attack result message
    setAttackResult(`${attackerMonster.name} did ${Math.round(adjustedDamage)} damage to ${defenderMonster.name}.`);
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
            onClick={() => handleAttack(1, selectedMonsters[0].attack1.damage, selectedMonsters[0].attack1.type, selectedMonsters[0].attack1.isPhysical)}
            disabled={!isMonster1Turn || monster2Hp === 0 || isGameOver}
            className={!isMonster1Turn || monster2Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack1.name}
          </button>
          <button
            onClick={() => handleAttack(1, selectedMonsters[0].attack2.damage, selectedMonsters[0].attack2.type, selectedMonsters[0].attack1.isPhysical)}
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
            onClick={() => handleAttack(2, selectedMonsters[1].attack1.damage, selectedMonsters[1].attack1.type, selectedMonsters[1].attack1.isPhysical)}
            disabled={isMonster1Turn || monster1Hp === 0 || isGameOver}
            className={isMonster1Turn || monster1Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[1].attack1.name}
          </button>
          <button
            onClick={() => handleAttack(2, selectedMonsters[1].attack2.damage, selectedMonsters[1].attack2.type, selectedMonsters[1].attack2.isPhysical)}
            disabled={isMonster1Turn || monster1Hp === 0 || isGameOver}
            className={isMonster1Turn || monster1Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[1].attack2.name}
          </button>
        </div>
      </div>
      {attackResult && <p className="attack-result">{attackResult}</p>}
      {monster1Hp === 0 && <h2>{selectedMonsters[1].name} Wins!</h2>}
      {monster2Hp === 0 && <h2>{selectedMonsters[0].name} Wins!</h2>}
    </div>
  );
}