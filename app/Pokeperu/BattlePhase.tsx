import { useState } from 'react';
import './styles.css';
import './battle.css';
import MonsterSelectionResults from './MonsterSelectionResults';
import MonsterBattle from './MonsterBattle';

interface MonsterBattleProps {
  selectedMonsters: { name: string; hp: number; image: string; }[];
}

export default function BattlePhase({ selectedMonsters }: MonsterBattleProps) {
  const [isBattleClicked, setBattleClicked] = useState(false);

  if (selectedMonsters.length !== 2) {
    return <></>;
  }

  console.log('MonsterBattle selectedMonsters:', selectedMonsters);

  return (
    <div className="MonsterSelectionResults">
      {isBattleClicked ? (
        <MonsterBattle selectedMonsters={selectedMonsters} />
      ) : (
        <MonsterSelectionResults
          monster1={selectedMonsters[0].name}
          monster2={selectedMonsters[1].name}
          monster1Image={selectedMonsters[0].image}
          monster2Image={selectedMonsters[1].image}
          setBattleClicked={() => setBattleClicked(true)}
        />
      )}
    </div>
  );
}