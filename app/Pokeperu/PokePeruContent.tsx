import './styles.css';
import { useState } from 'react';
import BattlePhase from './BattlePhase';
import MonsterSelection from './MonsterSelection';
import { monsters, type Monster } from './monsters';


export default function PokePeruContent() {
  const [selectedMonstersNames, setSelectedMonstersNames] = useState<string[]>([]);
  const [selectedMonsters, setSelectedMonsters] = useState<object[]>([]);
  const [currentUser, setCurrentUser] = useState(1);

  const handleMonsterSelect = (monster: Monster) => {
    if (selectedMonstersNames.includes(monster.name)) return; // Prevent duplicate selection

    setSelectedMonstersNames([...selectedMonstersNames, monster.name]);
    setSelectedMonsters([...selectedMonsters, monster]);
    setCurrentUser(currentUser === 1 ? 2 : 1); // Switch user
  };

  return (
    <>
      {selectedMonstersNames.length < 2 ? (
        <MonsterSelection
          monsters={monsters}
          selectedMonstersNames={selectedMonstersNames}
          currentUser={currentUser}
          handleMonsterSelect={handleMonsterSelect}
        />
      ) : (
        <BattlePhase selectedMonsters={selectedMonsters} />
      )}
    </>
  );
}