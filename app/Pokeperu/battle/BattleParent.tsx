import { useState } from 'react';
import SelectionResultsScreen from './SelectionResultsScreen';
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
      {!isBattleClicked ? (
        <SelectionResultsScreen
          monster1={selectedMonsters[0]}
          monster2={selectedMonsters[1]}
          setBattleClicked={() => setBattleClicked(true)}
        />
      ) : (
        <Battle selectedMonsters={selectedMonsters} />
      )}
    </div>
  );
}