import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';
import './battlestart.css';

interface MonsterSelectionResultsProps {
  monster1: string;
  monster2: string;
  monster1Image: string;
  monster2Image: string;
  setBattleClicked: () => void;
}

export default function MonsterSelectionResults({
  monster1,
  monster2,
  monster1Image,
  monster2Image,
  setBattleClicked,
}: MonsterSelectionResultsProps) {
  console.log('MonsterSelectionResults Monsters 0:', monster1);
  console.log('MonsterSelectionResults Monsters 1:', monster2);

  return (
    <div className="MonsterSelectionResults">
      <h1>Selection Results</h1>
      <div className="monster-container">
        <div className="monster">
          <p>User 1 chose: {monster1}</p>
          <img src={monster1Image} alt={monster1} className="monster-image" />
        </div>
        <div className="monster">
          <p>User 2 chose: {monster2}</p>
          <img src={monster2Image} alt={monster2} className="monster-image" />
        </div>
      </div>
      <Button onClick={setBattleClicked}>Start Battle</Button>
    </div>
  );
}