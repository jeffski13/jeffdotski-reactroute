import { useState } from 'react';
import MonsterSelectionResults from './MonsterSelectionResults';
import Battle from './Battle';
import '../styles.css';
import './battle.css';

interface BattleProps {
  selectedMonsters: {
    name: string;
    hp: number;
    image: string;
    type: string;
    secondType: string | null;
  }[];
}

export default function BattlePhase({ selectedMonsters }: BattleProps) {
  const [isBattleClicked, setBattleClicked] = useState(false);

  if (selectedMonsters.length !== 2) {
    return <></>;
  }

  return (
    <div className="MonsterSelectionResults">
      {isBattleClicked ? (
        <Battle selectedMonsters={selectedMonsters} />
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