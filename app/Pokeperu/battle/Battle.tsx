import { useState, useEffect } from 'react';
import { ElementType } from '../ElementType';
import type { Monster, MonsterAttack } from '../monsters';
import Typewriter from './Typewriter';
import ROUTES from '~/consts/ROUTES';
import '../navigation.css';
import './battle.css';
import './navigationOverride.css';

interface BattleProps {
  selectedMonsters: Monster[];
  attackMissedPercentage?: number; // Optional property to dynamically control the miss chance
  isAttackRandomDamage?: boolean; // Optional property to dynamically control the attack random damage
  isTextRenderInstant?: boolean; // Optional property to dynamically control the attack random damage
  isInstantStruggleEnabled?: boolean; // Optional property to dynamically control the attack random damage
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
  isPhysical: boolean,
  isAttackRandomDamage: boolean
): number => {

  // Calculate adjusted damage using the provided formula
  const A = isPhysical ? attackerMonster.attack : attackerMonster.specialAttack;
  const D = isPhysical ? defenderMonster.defense : defenderMonster.specialDefense;

  let level = 10;
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

  if (isAttackRandomDamage) {
    const Z = Math.random() * (255 - 217) + 217; // Random number between 217 and 255
    const randomFactor = Z / 255; // Normalize to 0-1 range
    adjustedDamage *= randomFactor; // Apply random factor
  }

  // Round the final adjusted damage to remove decimals
  return Math.round(adjustedDamage);
};

const STRUGGLE_ATTACK: MonsterAttack = {
  name: 'Struggle',
  damage: 10,
  type: ElementType.Normal,
  isPhysical: true,
  powerPoints: 999, // Not used, just for compatibility
  accuracy: 1,
};

export default function Battle({
  selectedMonsters,
  attackMissedPercentage,
  isAttackRandomDamage: attackRandomDamage = true,
  isTextRenderInstant = false,
  isInstantStruggleEnabled = false,
}: BattleProps) {
  const isMonster1First = selectedMonsters[0].speed >= selectedMonsters[1].speed;
  const [monster1Hp, setMonster1Hp] = useState(selectedMonsters[0].hp);
  const [monster2Hp, setMonster2Hp] = useState(selectedMonsters[1].hp);
  const [isMonster1Turn, setIsMonster1Turn] = useState(isMonster1First);
  const [attackResult, setAttackResult] = useState<string | null>(`${isMonster1First ? selectedMonsters[0].name : selectedMonsters[1].name} attacks first.`);
  const [effectivenessResult, setEffectivenessResult] = useState<string | null>('');
  const [isMonster1Blinking, setIsMonster1Blinking] = useState(false);
  const [isMonster2Blinking, setIsMonster2Blinking] = useState(false);
  const [damageToMonster1Animation, setDamageToMonster1Animation] = useState<string | null>(null);
  const [damageToMonster2Animation, setDamageToMonster2Animation] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [monster1Attack1PP, setMonster1Attack1PP] = useState(selectedMonsters[0].attack1.powerPoints);
  const [monster1Attack2PP, setMonster1Attack2PP] = useState(selectedMonsters[0].attack2.powerPoints);
  const [monster2Attack1PP, setMonster2Attack1PP] = useState(selectedMonsters[1].attack1.powerPoints);
  const [monster2Attack2PP, setMonster2Attack2PP] = useState(selectedMonsters[1].attack2.powerPoints);
  const [monster1AttackAnim, setMonster1AttackAnim] = useState(false);
  const [monster2AttackAnim, setMonster2AttackAnim] = useState(false);

  useEffect(() => {
    // Randomly select an image from the /perulandscape folder on mount
    const randomImageIndex = Math.floor(Math.random() * 8) + 1; // Random number between 1 and 8
    setBackgroundImage(`/images/perulandscape/peru-${randomImageIndex}.jpg`);
  }, []);

  const handleStruggle = (attacker: number) => {
    const attackerMonster = selectedMonsters[attacker - 1];
    const defenderMonster = selectedMonsters[attacker === 1 ? 1 : 0];
    const selfDamage = Math.round(0.1 * attackerMonster.hp);
    const adjustedDamage = calculateAdjustedDamage(attackerMonster, defenderMonster, STRUGGLE_ATTACK.damage, STRUGGLE_ATTACK.type, STRUGGLE_ATTACK.isPhysical, attackRandomDamage);
    if (attacker === 1) {
      setIsMonster1Turn(false);
      setMonster2Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0));
      setMonster1Hp((prevHp) => Math.max(prevHp - selfDamage, 0));
    } else {
      setIsMonster1Turn(true);
      setMonster1Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0));
      setMonster2Hp((prevHp) => Math.max(prevHp - selfDamage, 0));
    }
    setAttackResult(`${attackerMonster.name} used ${STRUGGLE_ATTACK.name}! It did ${Math.round(adjustedDamage)} damage to ${defenderMonster.name}.`);
    setEffectivenessResult(`${attackerMonster.name} is hurt by recoil!`);
  }

  const handleAttack = (
    attacker: number,
    attackIndex: number
  ) => {
    setAttackResult('');

    const attackerMonster = selectedMonsters[attacker - 1];
    const defenderMonster = selectedMonsters[attacker === 1 ? 1 : 0];

    let adjustedDamage = 0;

    const selectedAttack =
      attackIndex === 1
        ? attackerMonster.attack1
        : attackerMonster.attack2;

    const missChance = attackMissedPercentage ?? 0.1;
    const attackHitChance = selectedAttack.accuracy ?? 1; // Default to 1 if not provided
    const attackMissed = (Math.random() < missChance) || (attackHitChance < Math.random());

    if (attackMissed) {
      adjustedDamage = 0;
    } else {
      adjustedDamage = calculateAdjustedDamage(
        attackerMonster,
        defenderMonster,
        selectedAttack.damage,
        selectedAttack.type,
        selectedAttack.isPhysical,
        attackRandomDamage // Pass attackRandomDamage here
      );
      if (attacker === 1) {
        setDamageToMonster2Animation(selectedAttack.type); // Set the attack animation based on the attackType
        setTimeout(() => setDamageToMonster2Animation(null), 500); // Clear the animation after 500ms
      } else {
        setDamageToMonster1Animation(selectedAttack.type); // Set the attack animation based on the attackType
        setTimeout(() => setDamageToMonster1Animation(null), 500); // Clear the animation after 500ms
      }
    }

    if (attacker === 1) {
      setMonster1AttackAnim(true);
      setTimeout(() => setMonster1AttackAnim(false), 400); // duration matches animation
      setIsMonster1Turn(false);
      setMonster2Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0));
      if (!attackMissed) {
        setIsMonster2Blinking(true);
        setTimeout(() => setIsMonster2Blinking(false), 500);
      }

      // Reduce Power Points for Monster 1
      if (attackIndex === 1) {
        setMonster1Attack1PP((prevPP) => Math.max(prevPP - 1, 0));
      } else {
        setMonster1Attack2PP((prevPP) => Math.max(prevPP - 1, 0));
      }
    } else {
      setMonster2AttackAnim(true);
      setTimeout(() => setMonster2AttackAnim(false), 400); // duration matches animation
      setIsMonster1Turn(true);
      setMonster1Hp((prevHp) => Math.max(prevHp - adjustedDamage, 0));
      if (!attackMissed) {
        setIsMonster1Blinking(true);
        setTimeout(() => setIsMonster1Blinking(false), 500);
      }

      // Reduce Power Points for Monster 2
      if (attackIndex === 1) {
        setMonster2Attack1PP((prevPP) => Math.max(prevPP - 1, 0));
      } else {
        setMonster2Attack2PP((prevPP) => {
          return Math.max(prevPP - 1, 0)
        });
      }
    }

    setAttackResult(
      `${attackerMonster.name} did ${Math.round(
        adjustedDamage
      )} damage to ${defenderMonster.name}.`
    );
    if (attackMissed) {
      setEffectivenessResult(`${attackerMonster.name}'s attack missed!`);
    } else {
      const primaryEffectiveness = typeEffectiveness(
        selectedAttack.type,
        defenderMonster.type
      );
      const secondaryEffectiveness = typeEffectiveness(
        selectedAttack.type,
        defenderMonster.secondType
      );
      const effectivenessFactor =
        primaryEffectiveness * secondaryEffectiveness;
      if (effectivenessFactor === 0.5) {
        setEffectivenessResult(`It's not very effective.`);
      } else if (effectivenessFactor === 2 || effectivenessFactor === 4) {
        setEffectivenessResult(`It's super effective!`);
      } else {
        setEffectivenessResult(``);
      }
    }
  };

  /**
   * for rendering the HP bar
   * @param currentHp 
   * @param maxHp 
   * @returns 
   */
  const calculateHpPercentage = (currentHp: number, maxHp: number) => {
    return (currentHp / maxHp) * 100;
  };

  const isMonster1Winner = monster2Hp === 0;
  const isMonster2Winner = monster1Hp === 0;
  const isGameOver = isMonster1Winner || isMonster2Winner;

  const isMonster1Attack1Enabled = !isMonster1Turn || monster2Hp === 0 || isGameOver || monster1Attack1PP === 0;
  const isMonster1Attack2Enabled = !isMonster1Turn || monster2Hp === 0 || isGameOver || monster1Attack2PP === 0;
  const isMonster2Attack1Enabled = isMonster1Turn || monster1Hp === 0 || isGameOver || monster2Attack1PP === 0;
  const isMonster2Attack2Enabled = isMonster1Turn || monster1Hp === 0 || isGameOver || monster2Attack2PP === 0;

  // Add keyboard shortcuts for attacks
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isGameOver) return;

      switch (event.key) {
        case '1': // Monster 1, Attack 1
          if (isMonster1Turn && !isMonster1Attack1Enabled) {
            handleAttack(1, 1);
          }
          break;
        case '2': // Monster 1, Attack 2
          if (isMonster1Turn && !isMonster1Attack2Enabled) {
            handleAttack(1, 2);
          }
          break;
        case '3': // Monster 2, Attack 1
          if (!isMonster1Turn && !isMonster2Attack1Enabled) {
            handleAttack(2, 1);
          }
          break;
        case '4': // Monster 2, Attack 2
          if (!isMonster1Turn && !isMonster2Attack2Enabled) {
            handleAttack(2, 2);
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

  // Struggle mechanics
  useEffect(() => {
    const isMonster1StruggleEnabled = monster1Attack1PP === 0 && monster1Attack2PP === 0;
    const isMonster2StruggleEnabled = monster2Attack1PP === 0 && monster2Attack2PP === 0;
    const struggleDelay = 2000;

    if (!isGameOver) {
      if (isMonster1Turn && isMonster1StruggleEnabled) {
        if (isInstantStruggleEnabled) {
          handleStruggle(1);
        }
        else {
          setTimeout(() => {
            handleStruggle(1);
          }, struggleDelay);
        }
      }
      if (!isMonster1Turn && isMonster2StruggleEnabled) {
        if (isInstantStruggleEnabled) {
          handleStruggle(2);
        }
        else {
          setTimeout(() => {
            handleStruggle(2);
          }, struggleDelay);
        }
      }
    }

    return () => {
    };
  }, [isMonster1Turn, isGameOver, monster1Attack1PP, monster1Attack2PP, monster2Attack1PP, monster2Attack2PP]);


  let battleTitle = `${selectedMonsters[0].trainer} vs ${selectedMonsters[1].trainer}`;
  if (isMonster2Winner) {
    battleTitle = `${selectedMonsters[1].trainer} Wins!`
  }
  else if (isMonster1Winner) {
    battleTitle = `${selectedMonsters[0].trainer} Wins!`
  }

  return (
    <div className="Battle">
      <div className="battle-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}></div>
      <div className="battle-container">
        <a href={ROUTES.pokePeru.battle} className="back-button battle-back-button">
          <img src="/images/arrow-left.png" alt="Back" className="back-arrow" />
        </a>
        <div className="battle-text-with-backdrop">
          <h1 className="battle-title"><Typewriter text={battleTitle} isInstantTextRender={isTextRenderInstant} /></h1>
        </div>
      </div>
      <div
        className="battle-container"
      >
        <div className={`monster battle-text-with-backdrop ${isMonster1Winner ? 'monster-winner' : ''} ${isMonster2Winner ? 'monster-loser' : ''}`}>
          <div>
            <h2>{selectedMonsters[0].name}</h2>
            <img
              src={selectedMonsters[0].image}
              alt={selectedMonsters[0].name}
              className={`monster-battle-image ${isMonster1Blinking ? 'blinking' : ''} ${monster1AttackAnim ? 'monster1-attack-anim' : ''}`}
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
            onClick={() =>
              handleAttack(1, 1)
            }
            disabled={isMonster1Attack1Enabled}
            className={isMonster1Attack1Enabled ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack1.name}<br />PP: {monster1Attack1PP}/{selectedMonsters[0].attack1.powerPoints}
          </button>
          <button
            onClick={() =>
              handleAttack(1, 2)
            }
            disabled={isMonster1Attack2Enabled}
            className={isMonster1Attack2Enabled ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[0].attack2.name}<br />PP: {monster1Attack2PP}/{selectedMonsters[0].attack2.powerPoints}
          </button>
        </div>
        <div className={`monster battle-text-with-backdrop ${isMonster2Winner ? 'monster-winner' : ''} ${isMonster1Winner ? 'monster-loser' : ''}`}>
          <h2>{selectedMonsters[1].name}</h2>
          <img
            src={selectedMonsters[1].image}
            alt={selectedMonsters[1].name}
            className={`monster-battle-image ${isMonster2Blinking ? 'blinking' : ''} ${monster2AttackAnim ? 'monster2-attack-anim' : ''}`}
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
            onClick={() =>
              handleAttack(2, 1)
            }
            disabled={isMonster2Attack1Enabled}
            className={isMonster2Attack1Enabled ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[1].attack1.name}<br />PP: {monster2Attack1PP}/{selectedMonsters[1].attack1.powerPoints}
          </button>
          <button
            onClick={() =>
              handleAttack(2, 2)
            }
            disabled={isMonster2Attack2Enabled}
            className={isMonster2Attack2Enabled ? 'attack-button disabled' : 'attack-button enabled'}
          >
            {selectedMonsters[1].attack2.name}<br />PP: {monster2Attack2PP}/{selectedMonsters[1].attack2.powerPoints}
          </button>
        </div>
      </div>
      <div className="battle-container">
        <div className="battle-results battle-text-with-backdrop">
          <Typewriter text={attackResult} isInstantTextRender={isTextRenderInstant} />
          <br />
          <Typewriter text={effectivenessResult} isInstantTextRender={isTextRenderInstant} />
        </div>
      </div>
    </div>
  );
}
