import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

interface MonsterSelectionResultsProps {
  monster1: string;
  monster2: string;
  setBattleClicked: () => void;
}

export default function MonsterSelectionResults({
  monster1,
  monster2,
  setBattleClicked,
}: MonsterSelectionResultsProps) {
  console.log('MonsterSelectionResults Monsters 0:', monster1);
  console.log('MonsterSelectionResults Monsters 1:', monster2);

  return (
    <div className="MonsterSelectionResults">
      <h1>Selection Results</h1>
      <p>User 1 chose: {monster1}</p>
      <p>User 2 chose: {monster2}</p>
      <Button onClick={setBattleClicked}>Start Battle</Button>
    </div>
  );
}