import { useState, useEffect } from 'react';
import { ElementType } from '../ElementType';
import type { Monster } from '../monsters';
import './battle.css';

interface BattleProps {
  selectedMonsters: Monster[];
  attackMissedPercentage?: number; // Optional property to dynamically control the miss chance
}

// Moved the typeEffectiveness function to the top level of the file to ensure it is accessible
const typeEffectiveness = (attackType: ElementType, defenderType: ElementType | null) => {
  if (!defenderType) return 1; // No second type

  const effectivenessChart: Record<ElementType, { x0: ElementType[]; x0_5: ElementType[]; x2: ElementType[] }> = {
    [ElementType.Normal]: { x0: [ElementType.Ghost], x0_5: [ElementType.Rock, ElementType.Steel], x2: [] },
    [ElementType.Fire]: { x0: [], x0_5: [ElementType.Fire, ElementType.Water, ElementType.Rock, ElementType.Dragon], x2: [ElementType.Grass, ElementType.Ice, ElementType.Bug, ElementType.Steel] },
    [ElementType.Water]: { x0: [], x0_5: [ElementType.Water, ElementType.Grass, ElementType.Dragon], x2: [ElementType.Fire, ElementType.Ground, ElementType.Rock] },
    [ElementType.Electric]: { x0: [ElementType.Ground], x0_5: [ElementType.Electric, ElementType.Grass, ElementType.Dragon], x2: [ElementType.Water, ElementType.Flying] },
    [ElementType.Grass]: { x0: [], x0_5: [ElementType.Fire, ElementType.Grass, ElementType.Poison, ElementType.Flying, ElementType.Bug, ElementType.Dragon, ElementType.Steel], x2: [ElementType.Water, ElementType.Ground, ElementType.Rock] },
    [ElementType.Ice]: { x0: [], x0_5: [ElementType.Fire, ElementType.Water, ElementType.Ice, ElementType.Steel], x2: [ElementType.Grass, ElementType.Ground, ElementType.Flying, ElementType.Dragon] },
    [ElementType.Fighting]: { x0: [ElementType.Ghost], x0_5: [ElementType.Poison, ElementType.Flying, ElementType.Psychic, ElementType.Bug, ElementType.Fairy], x2: [ElementType.Normal, ElementType.Ice, ElementType.Rock, ElementType.Dark, ElementType.Steel] },
    [ElementType.Poison]: { x0: [ElementType.Steel], x0_5: [ElementType.Poison, ElementType.Ground, ElementType.Rock, ElementType.Ghost], x2: [ElementType.Grass, ElementType.Fairy] },
    [ElementType.Ground]: { x0: [ElementType.Flying], x0_5: [ElementType.Grass, ElementType.Bug], x2: [ElementType.Fire, ElementType.Electric, ElementType.Poison, ElementType.Rock, ElementType.Steel] },
    [ElementType.Flying]: { x0: [], x0_5: [ElementType.Electric, ElementType.Rock, ElementType.Steel], x2: [ElementType.Grass, ElementType.Fighting, ElementType.Bug] },
    [ElementType.Psychic]: { x0: [ElementType.Dark], x0_5: [ElementType.Psychic, ElementType.Steel], x2: [ElementType.Fighting, ElementType.Poison] },
    [ElementType.Bug]: { x0: [], x0_5: [ElementType.Fire, ElementType.Fighting, ElementType.Poison, ElementType.Flying, ElementType.Ghost, ElementType.Steel, ElementType.Fairy], x2: [ElementType.Grass, ElementType.Psychic, ElementType.Dark] },
    [ElementType.Rock]: { x0: [], x0_5: [ElementType.Fighting, ElementType.Ground, ElementType.Steel], x2: [ElementType.Fire, ElementType.Ice, ElementType.Flying, ElementType.Bug] },
    [ElementType.Ghost]: { x0: [ElementType.Normal], x0_5: [ElementType.Dark], x2: [ElementType.Psychic, ElementType.Ghost] },
    [ElementType.Dragon]: { x0: [ElementType.Fairy], x0_5: [ElementType.Steel], x2: [ElementType.Dragon] },
    [ElementType.Dark]: { x0: [], x0_5: [ElementType.Fighting, ElementType.Dark, ElementType.Fairy], x2: [ElementType.Psychic, ElementType.Ghost] },
    [ElementType.Steel]: { x0: [], x0_5: [ElementType.Fire, ElementType.Water, ElementType.Electric, ElementType.Steel], x2: [ElementType.Ice, ElementType.Rock, ElementType.Fairy] },
    [ElementType.Fairy]: { x0: [], x0_5: [ElementType.Fire, ElementType.Poison, ElementType.Steel], x2: [ElementType.Fighting, ElementType.Dragon, ElementType.Dark] },
  };

  if (effectivenessChart[attackType].x0.includes(defenderType)) return 0;
  if (effectivenessChart[attackType].x0_5.includes(defenderType)) return 0.5;
  if (effectivenessChart[attackType].x2.includes(defenderType)) return 2;
  return 1;
};

export const calculateAdjustedDamage = (
  attackerMonster: Monster,
  defenderMonster: Monster,
  attackBaseDamage: number,
  attackType: ElementType,
  isPhysical: boolean
): number => {

  // Calculate adjusted damage using the provided formula
  const A = isPhysical ? attackerMonster.attack : attackerMonster.specialAttack;
  const D = isPhysical ? defenderMonster.defense : defenderMonster.specialDefense;

  let level = 25;
  let criticalHitFactor = 1;
  let adjustedDamage = (((((2 * level * criticalHitFactor) / 5) + 2) * attackBaseDamage * (A / D)) / 50) + 2

  // Adjust damage based on type effectiveness
  const primaryEffectiveness = typeEffectiveness(attackType, defenderMonster.type);
  const secondaryEffectiveness = typeEffectiveness(attackType, defenderMonster.secondType);
  const effectivenessFactor = primaryEffectiveness * secondaryEffectiveness;
  adjustedDamage *= effectivenessFactor;

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

export default function Battle({ selectedMonsters, attackMissedPercentage }: BattleProps) {
  const isMonster1First = selectedMonsters[0].speed >= selectedMonsters[1].speed;
  const [monster1Hp, setMonster1Hp] = useState(selectedMonsters[0].hp);
  const [monster2Hp, setMonster2Hp] = useState(selectedMonsters[1].hp);
  const [isMonster1Turn, setIsMonster1Turn] = useState(isMonster1First);
  const [attackResult, setAttackResult] = useState<string | null>(null);
  const [effectivenessResult, setEffectivenessResult] = useState<string | null>(null);
  const [isMonster1Blinking, setIsMonster1Blinking] = useState(false);
  const [isMonster2Blinking, setIsMonster2Blinking] = useState(false);
  const [damageToMonster1Animation, setDamageToMonster1Animation] = useState<string | null>(null); // New state for attack animation
  const [damageToMonster2Animation, setDamageToMonster2Animation] = useState<string | null>(null); // New state for attack animation

  const handleAttack = (attacker: number, attackBaseDamage: number, attackType: ElementType, isPhysical: boolean) => {
    const attackerMonster = selectedMonsters[attacker - 1];
    const defenderMonster = selectedMonsters[attacker === 1 ? 1 : 0];

    let adjustedDamage = 0;

    const missChance = attackMissedPercentage ?? 0.1;
    const attackMissed = Math.random() < missChance;

    if (attackMissed) {
      adjustedDamage = 0;
    } else {
      adjustedDamage = calculateAdjustedDamage(attackerMonster, defenderMonster, attackBaseDamage, attackType, isPhysical);
    }

    if (attacker === 1) {
      setMonster2Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0));
      if (!attackMissed) {
        setIsMonster2Blinking(true);
        setTimeout(() => setIsMonster2Blinking(false), 500);
      }
      setIsMonster1Turn(false);
    } else {
      setMonster1Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0));
      if (!attackMissed) {
        setIsMonster1Blinking(true);
        setTimeout(() => setIsMonster1Blinking(false), 500);
      }
      setIsMonster1Turn(true);
    }

    // Trigger attack animation
    if (!attackMissed) {
      if(attacker === 1) {
        setDamageToMonster2Animation(attackType); // Set the attack animation based on the attackType
        setTimeout(() => setDamageToMonster2Animation(null), 500); // Clear the animation after 500ms
      }
      else {
        setDamageToMonster1Animation(attackType); // Set the attack animation based on the attackType
        setTimeout(() => setDamageToMonster1Animation(null), 500); // Clear the animation after 500ms
      }
    }

    setAttackResult(`${attackerMonster.name} did ${Math.round(adjustedDamage)} damage to ${defenderMonster.name}.`);
    if (attackMissed) {
      setEffectivenessResult(`${attackerMonster.name}'s attack missed!`);
    } else {
      const primaryEffectiveness = typeEffectiveness(attackType, defenderMonster.type);
      const secondaryEffectiveness = typeEffectiveness(attackType, defenderMonster.secondType);
      const effectivenessFactor = primaryEffectiveness * secondaryEffectiveness;
      if (effectivenessFactor === 0.5) {
        setEffectivenessResult(`It's not very effective.`);
      } else if (effectivenessFactor === 2 || effectivenessFactor === 4) {
        setEffectivenessResult(`It's super effective!`);
      } else {
        setEffectivenessResult(``);
      }
    }
  };

  const calculateHpPercentage = (currentHp: number, maxHp: number) => {
    return (currentHp / maxHp) * 100;
  };

  const isGameOver = monster1Hp === 0 || monster2Hp === 0;

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isGameOver) return;

      switch (event.key) {
        case '1': // Monster 1, Attack 1
          if (isMonster1Turn) {
            handleAttack(1, selectedMonsters[0].attack1.damage, selectedMonsters[0].attack1.type, selectedMonsters[0].attack1.isPhysical);
          }
          break;
        case '2': // Monster 1, Attack 2
          if (isMonster1Turn) {
            handleAttack(1, selectedMonsters[0].attack2.damage, selectedMonsters[0].attack2.type, selectedMonsters[0].attack2.isPhysical);
          }
          break;
        case '3': // Monster 2, Attack 1
          if (!isMonster1Turn) {
            handleAttack(2, selectedMonsters[1].attack1.damage, selectedMonsters[1].attack1.type, selectedMonsters[1].attack1.isPhysical);
          }
          break;
        case '4': // Monster 2, Attack 2
          if (!isMonster1Turn) {
            handleAttack(2, selectedMonsters[1].attack2.damage, selectedMonsters[1].attack2.type, selectedMonsters[1].attack2.isPhysical);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isMonster1Turn, isGameOver, selectedMonsters]);

  return (
    <div className="Battle">
      <h1>Battle Time!</h1>
      <div className="battle-container">
        <div className="monster">
          <div>
            <h3>Trainer: {selectedMonsters[0].trainer}</h3>
            <h2>{selectedMonsters[0].name}</h2>
            <img
              src={selectedMonsters[0].image}
              alt={selectedMonsters[0].name}
              className={`monster-battle-image ${isMonster1Blinking ? 'blinking' : ''}`}
            />
            {damageToMonster1Animation && <div className={`attack-animation ${damageToMonster1Animation}`}></div>}
          </div>
          <p>HP: {monster1Hp}</p>
          <div className="hp-bar">
            <div
              className="hp-bar-fill"
              style={{
                width: `${calculateHpPercentage(monster1Hp, selectedMonsters[0].hp)}%`,
              }}
            >
            </div>
          </div>
          <button
            onClick={() => handleAttack(1, selectedMonsters[0].attack1.damage, selectedMonsters[0].attack1.type, selectedMonsters[0].attack1.isPhysical)}
            disabled={!isMonster1Turn || monster2Hp === 0 || isGameOver}
            className={!isMonster1Turn || monster2Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack1.name}
          </button>
          <button
            onClick={() => handleAttack(1, selectedMonsters[0].attack2.damage, selectedMonsters[0].attack2.type, selectedMonsters[0].attack2.isPhysical)}
            disabled={!isMonster1Turn || monster2Hp === 0 || isGameOver}
            className={!isMonster1Turn || monster2Hp === 0 || isGameOver ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack2.name}
          </button>
        </div>
        <div className="monster">
          <h3>Trainer: {selectedMonsters[1].trainer}</h3>
          <h2>{selectedMonsters[1].name}</h2>
          <img
            src={selectedMonsters[1].image}
            alt={selectedMonsters[1].name}
            className={`monster-battle-image ${isMonster2Blinking ? 'blinking' : ''}`}
          />
          {damageToMonster2Animation && <div className={`attack-animation ${damageToMonster2Animation}`}></div>}
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
      {effectivenessResult && <p className="attack-result">{effectivenessResult}</p>}
      {monster1Hp === 0 && <h2>{selectedMonsters[1].name} Wins!</h2>}
      {monster2Hp === 0 && <h2>{selectedMonsters[0].name} Wins!</h2>}
    </div>
  );
}