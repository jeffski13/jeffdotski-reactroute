import { useState } from 'react';
import './styles.css';
import './battle.css';
import { Button } from 'react-bootstrap';


interface MonsterSelectionResultsProps {
  monster1: String;
  monster2: String;
  setBattleClicked: Function;
}


function MonsterSelectionResults(selectionResults: MonsterSelectionResultsProps) {
  console.log('MonsterSelectionResults Monsters 0:', selectionResults.monster1);
  console.log('MonsterSelectionResults Monsters 1:', selectionResults.monster2);
  return (
    <div className="MonsterSelectionResults">
      <h1>Selection Results</h1>
      <p>User 1 chose: {selectionResults.monster1}</p>
      <p>User 2 chose: {selectionResults.monster2}</p>
      <Button onClick={() => selectionResults.setBattleClicked()}>Start Battle</Button>
    </div>
  );
}

interface MonsterBattleProps {
  selectedMonsters: { name: string; hp: number }[];
}

export default function MonsterBattle({ selectedMonsters }: MonsterBattleProps) {
  const [isBattleClicked, setBattleClicked] = useState(false);


  if(selectedMonsters.length !== 2) {
    return<></>
  }

  console.log('MonsterBattle selectedMonsters:', selectedMonsters);

  return (
    <div className="MonsterSelectionResults">
      {isBattleClicked ? (
        <BattlePage selectedMonsters={selectedMonsters} />
      ) : (
        <MonsterSelectionResults monster1={selectedMonsters[0].name} monster2={selectedMonsters[1].name} setBattleClicked={() => {setBattleClicked(true)}} />
      )}
    </div>
  );
}




interface BattlePageProps {
  selectedMonsters: { name: string; hp: number }[];
}

export function BattlePage({ selectedMonsters }: BattlePageProps) {
  console.log('Selected Monsters:', selectedMonsters);

  const [monster1Hp, setMonster1Hp] = useState(selectedMonsters[0].hp);
  const [monster2Hp, setMonster2Hp] = useState(selectedMonsters[1].hp);

  const handleAttack = (attacker: number) => {
    if (attacker === 1) {
      setMonster2Hp((prevHp) => Math.max(prevHp - 10, 0)); // Monster 1 attacks Monster 2
    } else {
      setMonster1Hp((prevHp) => Math.max(prevHp - 10, 0)); // Monster 2 attacks Monster 1
    }
  };

  return (
    <div className="BattlePage">
      <h1>Battle Time!</h1>
      <div className="battle-container">
        <div className="monster">
          <h2>{selectedMonsters[0].name}</h2>
          <p>HP: {monster1Hp}</p>
          <button onClick={() => handleAttack(1)} disabled={monster2Hp === 0}>
            Attack
          </button>
        </div>
        <div className="monster">
          <h2>{selectedMonsters[1].name}</h2>
          <p>HP: {monster2Hp}</p>
          <button onClick={() => handleAttack(2)} disabled={monster1Hp === 0}>
            Attack
          </button>
        </div>
      </div>
      {monster1Hp === 0 && <h2>{selectedMonsters[1].name} Wins!</h2>}
      {monster2Hp === 0 && <h2>{selectedMonsters[0].name} Wins!</h2>}
    </div>
  );
}