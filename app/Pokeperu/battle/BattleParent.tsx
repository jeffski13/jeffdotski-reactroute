import { useState } from 'react';
import BattleStartScreen from './BattleStartScreen';
import Battle from './Battle';
import './battle.css';
import type { Monster } from '../monsters';

interface BattleProps {
  selectedMonsters: Monster[]
}

export default function BattleContainer({ selectedMonsters }: BattleProps) {
  const [isBattleClicked, setBattleClicked] = useState(false);

  if (selectedMonsters.length !== 2) {
    return <></>;
  }

  return (
    <div className="MonsterSelectionResults">
      {isBattleClicked ? (
        <Battle selectedMonsters={selectedMonsters} />
      ) : (
        <BattleStartScreen
          monster1={selectedMonsters[0].name}
          monster2={selectedMonsters[1].name}
          monster1Image={selectedMonsters[0].image}
          monster2Image={selectedMonsters[1].image}
          trainer1Image={selectedMonsters[0].trainerImage}
          trainer2Image={selectedMonsters[1].trainerImage}
          setBattleClicked={() => setBattleClicked(true)}
        />
      )}
    </div>
  );
}